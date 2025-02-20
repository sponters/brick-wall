import store from "state/store";
import { ChargeUpgradeStatus } from "consts";
import { selectRes } from "state/slices/inventorySlice";
import { selectUpgrade, setUpgrade } from "state/slices/improvementsSlice";
import { buyEffectLevelUpgrade, defaultControllerTickSpend, defaultSelectCapacityLevel } from "engine/upgrade";
import { batteryBaseChargeSpeed } from "engine/eletronics";

const def = {
    upgradeId: 'hashGeneratorSpeed',

    initialState: {
        info: {
            unlocked: false,
            status: ChargeUpgradeStatus.pending,
            level: 0,
            chargeSpeed: 1,
            dischargeSpeed: 1,
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
        const state = store.getState();
        const v1 = selectUpgrade(state, levelId, ownerId, "hashGeneratorSpeed").info.level;
        const v2 = selectUpgrade(state, levelId, ownerId, "hashGeneratorSpeedV2").info.level;
        const chargeSpeed = batteryBaseChargeSpeed * (v1 + 1) * (1 + v2);
        const dischargeSpeed = batteryBaseChargeSpeed * v1;
        store.dispatch(setUpgrade({ levelId, ownerId, upgradeId: "hashGenerator", value: { info: { chargeSpeed, dischargeSpeed } } }));
        buyEffectLevelUpgrade(levelId, ownerId, upgradeId);
    }
}

export default def;