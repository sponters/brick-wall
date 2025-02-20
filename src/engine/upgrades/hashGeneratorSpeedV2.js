import store from "state/store";
import { ChargeUpgradeStatus } from "consts";
import { selectUpgrade, setUpgrade } from "state/slices/improvementsSlice";
import { buyEffectLevelUpgrade, defaultControllerTickSpend, defaultSelectCapacityLevel } from "engine/upgrade";
import { batteryBaseChargeSpeed } from "engine/eletronics";

const def = {
    upgradeId: 'hashGeneratorSpeedV2',

    initialState: {
        info: {
            unlocked: false,
            status: ChargeUpgradeStatus.pending,
            level: 0,
            chargeSpeed: 1,
            dischargeSpeed: 1,
            costDef: {
                hash: {
                    base: 6,
                    factor: 1.3,
                },
                rainbow: {
                    base: 2,
                    factor: 1.1,
                }
            },
            tickCost: {
                hash: 1,
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

    checkUnlock: (state, levelId, ownerId) => selectUpgrade(state, levelId, ownerId, "controllerUpgrade")?.info.level >= 1,

    selectCapacityLevel: defaultSelectCapacityLevel,
    tickSpend: defaultControllerTickSpend,
    
    buyEffect: (levelId, ownerId, upgradeId) => {
        const state = store.getState();
        const v1 = selectUpgrade(state, levelId, ownerId, "hashGeneratorSpeed").info.level;
        const v2 = selectUpgrade(state, levelId, ownerId, "hashGeneratorSpeedV2").info.level;
        const chargeSpeed = batteryBaseChargeSpeed * v1 * (1 + v2);
        const dischargeSpeed = batteryBaseChargeSpeed * v1;
        store.dispatch(setUpgrade({ levelId, ownerId, upgradeId: "hashGenerator", value: { info: { chargeSpeed, dischargeSpeed } } }));
        buyEffectLevelUpgrade(levelId, ownerId, upgradeId);
    }
}

export default def;