import store from 'state/store'
import { addTickCallback } from './loop'
import { discharge, selectBrick, selectDef, selectObj, setLevels, setBrick } from 'state/slices/levelsSlice';
import { expire, gain, selectItemInfo } from 'state/slices/inventorySlice';

export function createBrickState(batteryId, type) {
    return {
        info: {
            batteryId,
            type,
            maxHealth: selectDef(store.getState(), type).maxHealth,
            health: selectDef(store.getState(), type).maxHealth,
            cracked1: Math.floor(Math.random() * 3) + 1,
            cracked2: Math.floor(Math.random() * 3) + 1,
        },
        tick: {
            brokenTicks: 0,
            brokenCharge: 0,
        }
    }
};

export function hit(levelId, brickId) {
    const state = store.getState();
    const brickInfo = selectBrick(state, levelId, brickId).info;
    const damage = selectItemInfo(state, "hammer").damage;
    const brickDef = selectDef(state, brickInfo.type);

    const realDamage = damage - brickDef.damageResistance;
    if (realDamage <= 0)
        return false;

    const health = brickInfo.health - realDamage;

    if (health > 0)
        store.dispatch(setBrick({ levelId, brickId, value: { info: { health } } }));
    else {
        store.dispatch(gain(brickDef.reward));
        store.dispatch(setBrick({
            levelId, brickId, value: {
                info: {
                    health: 0,
                },
                tick: {
                    brokenTicks: brickDef.regenTicks,
                    brokenCharge: brickDef.regenCharge,
                },
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

            if ((brick.tick.brokenTicks === 0) && (brick.tick.brokenCharge === 0))
                continue;

            if (selectObj(state, levelId, brick.batteryId).charge <= 0)
                continue;

            const newValues = {
                brokenTicks: brick.tick.brokenTicks,
                brokenCharge: brick.tick.brokenCharge,
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
                store.dispatch(expire(state.levels.defs[brick.type].expire));
                newValues.health = state.levels.defs[brick.type].maxHealth;
            }

            if (!batchDispatch[levelId])
                batchDispatch[levelId] = { bricks: {} };
            batchDispatch[levelId].bricks[brickId].tick = newValues;
        }

        if (Object.keys(batchDispatch).length > 0)
            store.dispatch(setLevels(batchDispatch));
    }
});