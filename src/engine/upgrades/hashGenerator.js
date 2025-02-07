import store from "state/store";
import { ChargeUpgradeStatus } from "consts";
import { discharge, gain, selectCharge } from "state/slices/inventorySlice";

const def = {
    id: 'hashGenerator',

    initialState: {
        status: ChargeUpgradeStatus.pending,
        charge: 0,
        costDef: {},
        capacityDef: {
            capacity: {
                base: 100,
                factor: 1.3,
            }
        },
    },
    
    selectLevel: state => state.res.hash.cur,

    tickSpend: () => {
        const state = store.getState();
        if (selectCharge(state, "controller").charge <= 0)
            return false;
        store.dispatch(discharge({ itemId: "controller", charge: 1 }));
        return true;
    },

    buyEffect: () => {
        store.dispatch(gain({ hash: 1 }));
    }
}

export default def;