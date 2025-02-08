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

            if (selectObj(state, levelId, brick.info.batteryId).charge <= 0)
                continue;

            const newValues = {
                tick: {
                    brokenTicks: brick.tick.brokenTicks,
                    brokenCharge: brick.tick.brokenCharge,
                }
            };

            if (newValues.tick.brokenTicks > 0)
                newValues.tick.brokenTicks--;

            if ((newValues.tick.brokenTicks === 0) && (newValues.tick.brokenCharge > 0)) {
                const dischargeValue = Math.min(newValues.tick.brokenCharge, selectObj(state, levelId, brick.info.batteryId).charge);

                if (dischargeValue > 0) {
                    newValues.tick.brokenCharge -= dischargeValue;
                    store.dispatch(discharge({ levelId, batteryId: brick.info.batteryId, charge: dischargeValue }));
                }
            }

            if ((newValues.tick.brokenTicks === 0) && (newValues.tick.brokenCharge === 0)) {
                store.dispatch(expire(state.levels.defs[brick.info.type].expire));
                newValues.info = { health: state.levels.defs[brick.info.type].maxHealth };
            }

            if (!batchDispatch[levelId])
                batchDispatch[levelId] = { bricks: {} };
            batchDispatch[levelId].bricks[brickId] = newValues;
        }

        if (Object.keys(batchDispatch).length > 0)
            store.dispatch(setLevels(batchDispatch));
    }
});