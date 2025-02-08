import store from "state/store";
import { ChargeUpgradeStatus } from "consts";
import { selectUpgrade } from "state/slices/improvementsSlice";
import { discharge, selectItemTick } from "state/slices/inventorySlice";
import { addObj } from "state/slices/levelsSlice";

const def = {
    upgradeId: 'batteryChargeFaster',

    initialState: {
        info: {
            unlocked: true,
            status: ChargeUpgradeStatus.pending,
            level: 0,
            costDef: {
                brick: {
                    base: 10,
                    factor: 2,
                },
                hash: {
                    base: 5,
                    factor: 1.3,
                }
            },
            capacityDef: {
                capacity: {
                    base: 100,
                    factor: 1.3,
                }
            },
        },
        charge: 0,
    },

    checkUnlock: () => true,

    selectCapacityLevel: (state, levelId, ownerId) => selectUpgrade(state, levelId, ownerId, "batteryChargeFaster").info.level,

    tickSpend: () => {
        const state = store.getState();
        if (selectItemTick(state, "controller").charge <= 0)
            return false;
        store.dispatch(discharge({ itemId: "controller", charge: 1 }));
        return true;
    },

    buyEffect: (levelId, ownerId) => {
        store.dispatch(addObj({ levelId, objId: ownerId, value: { chargeSpeed: 5 } }));
    }
}

export default def;