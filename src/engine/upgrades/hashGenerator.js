import store from "state/store";
import { ChargeUpgradeStatus } from "consts";
import { gain } from "state/slices/inventorySlice";
import { defaultControllerTickSpend } from "engine/upgrade";

const def = {
    upgradeId: 'hashGenerator',

    initialState: {
        info: {
            unlocked: true,
            status: ChargeUpgradeStatus.pending,
            auto: false,
            chargeSpeed: 1,
            costDef: {},
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

    selectCapacityLevel: state => state.inventory.res.hash.cur,
    tickSpend: defaultControllerTickSpend,

    buyEffect: () => {
        store.dispatch(gain({ hash: 1 }));
    }
}

export default def;