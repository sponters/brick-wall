import store from "state/store";
import { ChargeUpgradeStatus } from "consts";
import { gain } from "state/slices/inventorySlice";
import { defaultControllerTickSpend } from "engine/upgrade";
import { selectUpgrade } from "state/slices/improvementsSlice";

const def = {
    upgradeId: 'rainbowGenerator',

    initialState: {
        info: {
            unlocked: false,
            status: ChargeUpgradeStatus.pending,
            auto: false,
            chargeSpeed: 1,
            costDef: {},
            tickCost: {
                hash: 1
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

    selectCapacityLevel: state => state.inventory.res.rainbow.cur,
    tickSpend: defaultControllerTickSpend,

    buyEffect: () => {
        store.dispatch(gain({ rainbow: 1 }));
    }
}

export default def;