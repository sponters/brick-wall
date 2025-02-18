import store from "state/store";
import { ChargeUpgradeStatus } from "consts";
import { buyEffectLevelUpgrade, defaultControllerTickSpend, defaultSelectCapacityLevel } from "engine/upgrade";
import { addScore } from "state/slices/inventorySlice";

const def = {
    upgradeId: 'scoreMaxCombo',

    initialState: {
        info: {
            unlocked: true,
            status: ChargeUpgradeStatus.pending,
            level: 0,
            chargeSpeed: 1,
            costDef: {
                brick: {
                    base: 20,
                    factor: 1.4,
                },
                hash: {
                    base: 5,
                    factor: 1.2,
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
        store.dispatch(addScore({ info: { combo: { max: 10 } } }));
        buyEffectLevelUpgrade(levelId, ownerId, upgradeId);
    }
}

export default def;