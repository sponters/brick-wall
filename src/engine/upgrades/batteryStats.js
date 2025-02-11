import store from "state/store";
import { ChargeUpgradeStatus } from "consts";
import { addUpgrade } from "state/slices/improvementsSlice";
import { discharge, selectItemTick } from "state/slices/inventorySlice";

const def = {
    upgradeId: 'batteryStats',

    initialState: {
        info: {
            unlocked: true,
            status: ChargeUpgradeStatus.pending,
            level: 0,
            costDef: {
                hash: {
                    base: 5,
                    factor: 1
                }
            },
            capacityDef: {
                capacity: {
                    base: 500,
                    factor: 1,
                }
            },
        },
        charge: 0,
    },

    checkUnlock: () => true,

    selectCapacityLevel: () => 0,

    tickSpend: () => {
        const state = store.getState();
        if (selectItemTick(state, "controller").charge <= 0)
            return false;
        store.dispatch(discharge({ itemId: "controller", charge: 1 }));
        return true;
    },

    buyEffect: (levelId, ownerId) => {
        store.dispatch(addUpgrade({ levelId, ownerId, upgradeId: "batteryStats", value: { info: { level: 1 } } }));
    }
}

export default def;