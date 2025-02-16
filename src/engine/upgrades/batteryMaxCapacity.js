import store from "state/store";
import { ChargeUpgradeStatus } from "consts";
import { addObj } from "state/slices/levelsSlice";
import { buyEffectLevelUpgrade, defaultControllerTickSpend, defaultSelectCapacityLevel } from "engine/upgrade";

const def = {
    upgradeId: 'batteryMaxCapacity',

    initialState: {
        info: {
            unlocked: true,
            status: ChargeUpgradeStatus.pending,
            level: 0,
            chargeSpeed: 1,
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

    selectCapacityLevel: defaultSelectCapacityLevel,
    tickSpend: defaultControllerTickSpend,

    buyEffect: (levelId, ownerId, upgradeId) => {
        store.dispatch(addObj({ levelId, objId: ownerId, value: { capacity: 500 } }));
        buyEffectLevelUpgrade(levelId, ownerId, upgradeId);
    }
}

export default def;