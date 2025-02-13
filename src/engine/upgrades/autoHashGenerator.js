import { ChargeUpgradeStatus } from "consts";
import { selectRes } from "state/slices/inventorySlice";
import { buyEffectLevelUpgrade, defaultControllerTickSpend } from "engine/upgrade";
import store from "state/store";
import { setUpgrade } from "state/slices/improvementsSlice";

const def = {
    upgradeId: 'autoHashGenerator',

    initialState: {
        info: {
            unlocked: false,
            status: ChargeUpgradeStatus.pending,
            level: 0,
            maxLevel: 1,
            chargeSpeed: 1,
            costDef: {
                hash: {
                    base: 1,
                    factor: 1,
                }
            },
            capacityDef: {
                capacity: {
                    base: 400,
                    factor: 1,
                }
            },
        },
        charge: 0,
    },

    checkUnlock: (state) => selectRes(state, "hash").history >= 1,

    selectCapacityLevel: () => 0,
    tickSpend: defaultControllerTickSpend,

    buyEffect: (levelId, ownerId, upgradeId) => {
        store.dispatch(setUpgrade({ levelId, ownerId, upgradeId: "hashGenerator", value: { info: { auto: true } } }));
        buyEffectLevelUpgrade(levelId, ownerId, upgradeId);
    }
}

export default def;