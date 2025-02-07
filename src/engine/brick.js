import store from 'state/store'
import { addTickCallback } from './loop'
import { discharge, selectBrick, selectDef, selectObj, set, setBrick } from 'state/slices/levelsSlice';
import { expire, gain, selectItem } from 'state/slices/inventorySlice';

export function createBrickState(batteryId, type) {
    return {
        batteryId,
        type,
        maxHealth: selectDef(store.getState(), type).maxHealth,
        health: selectDef(store.getState(), type).maxHealth,
        brokenTicks: 0,
        brokenCharge: 0,
        reward: { ...selectDef(store.getState(), type).reward },
        expire: { ...selectDef(store.getState(), type).expire },
    }
};

export function hit(levelId, brickId) {
    const state = store.getState();
    const brick = selectBrick(state, levelId, brickId);
    const damage = selectItem(state, "hammer").damage;
    const brickDef = selectDef(state, brick.type);

    const realDamage = damage - brickDef.damageResistance;
    if (realDamage <= 0)
        return false;

    const health = brick.health - realDamage;

    if (health > 0)
        store.dispatch(setBrick({ levelId, brickId, value: { health } }));
    else {
        store.dispatch(gain(brick.reward));
        store.dispatch(setBrick({
            levelId, brickId, value: {
                health: 0,
                brokenTicks: brickDef.regenTicks,
                brokenCharge: brickDef.regenCharge,
            }
        }));
    }

    return true;
}

addTickCallback(3, () => {
    const batchDispatch = {};

    for (const [levelId, level] of Object.entries(store.getState().levels)) {
        if (!level.bricks)
            continue;

        for (const [brickId, brick] of Object.entries(level.bricks)) {
            const state = store.getState();

            if ((brick.brokenTicks === 0) && (brick.brokenCharge === 0))
                continue;

            if (selectObj(state, levelId, brick.batteryId).charge <= 0)
                continue;

            const newValues = {
                brokenTicks: brick.brokenTicks,
                brokenCharge: brick.brokenCharge,
            };

            if (newValues.brokenTicks > 0)
                newValues.brokenTicks--;

            if ((newValues.brokenTicks === 0) && (newValues.brokenCharge > 0)) {
                const dischargeValue = Math.min(newValues.brokenCharge, selectObj(state, levelId, brick.batteryId).charge);

                if (dischargeValue > 0) {
                    newValues.brokenCharge -= dischargeValue;
                    store.dispatch(discharge({ levelId, batteryId: brick.batteryId, charge: dischargeValue }));
                }
            }

            if ((newValues.brokenTicks === 0) && (newValues.brokenCharge === 0)) {
                store.dispatch(expire(brick.expire));
                newValues.health = state.levels.defs[brick.type].maxHealth;
            }

            if (!batchDispatch[levelId])
                batchDispatch[levelId] = { bricks: {} };
            batchDispatch.levels[levelId].bricks[brickId] = newValues;
        }

        if (Object.keys(batchDispatch).length > 0)
            store.dispatch(set(batchDispatch));
    }
});