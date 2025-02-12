import store from "state/store";
import { ChargeUpgradeStatus } from "consts";
import { selectRes } from "state/slices/inventorySlice";
import { addUpgrade } from "state/slices/improvementsSlice";
import { buyEffectLevelUpgrade, defaultControllerTickSpend, defaultSelectCapacityLevel } from "engine/upgrade";

const def = {
    upgradeId: 'hashGeneratorSpeed',

    initialState: {
        info: {
            unlocked: false,
            status: ChargeUpgradeStatus.pending,
            level: 0,
            chargeSpeed: 1,
            costDef: {
                hash: {
                    base: 4,
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

    checkUnlock: (state) => selectRes(state, "hash").history >= 4,

    selectCapacityLevel: defaultSelectCapacityLevel,
    tickSpend: defaultControllerTickSpend,
    
    buyEffect: (levelId, ownerId, upgradeId) => {
        store.dispatch(addUpgrade({ levelId, ownerId, upgradeId: "hashGenerator", value: { info: { chargeSpeed: 1 } } }));
        buyEffectLevelUpgrade(levelId, ownerId, upgradeId);
    }
}

export default def;