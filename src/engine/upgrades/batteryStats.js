import { ChargeUpgradeStatus } from "consts";
import { buyEffectLevelUpgrade, defaultControllerTickSpend, defaultSelectCapacityLevel } from "engine/upgrade";

const def = {
    upgradeId: 'batteryStats',

    initialState: {
        info: {
            unlocked: true,
            status: ChargeUpgradeStatus.pending,
            level: 0,
            chargeSpeed: 1,
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

    selectCapacityLevel: defaultSelectCapacityLevel,
    tickSpend: defaultControllerTickSpend,
    buyEffect: buyEffectLevelUpgrade
}

export default def;