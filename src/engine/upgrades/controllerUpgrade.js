import { ChargeUpgradeStatus } from "consts";
import { buyEffectLevelUpgrade, defaultControllerTickSpend, defaultSelectCapacityLevel } from "engine/upgrade";

const def = {
    upgradeId: 'controllerUpgrade',

    initialState: {
        info: {
            unlocked: true,
            status: ChargeUpgradeStatus.pending,
            level: 0,
            maxLevel: 1,
            chargeSpeed: 1,
            costDef: {
                hash: {
                    base: 15,
                    factor: 1,
                }
            },
            tickCost: {
                hash: 1
            },
            capacityDef: {
                capacity: {
                    base: 100,
                    factor: 1,
                }
            },
        },
        charge: 0,
    },

    checkUnlock: () => true,

    selectCapacityLevel: defaultSelectCapacityLevel,
    tickSpend: defaultControllerTickSpend,

    buyEffect: (levelId, ownerId, upgradeId) => {
        buyEffectLevelUpgrade(levelId, ownerId, upgradeId);
    }
}

export default def;