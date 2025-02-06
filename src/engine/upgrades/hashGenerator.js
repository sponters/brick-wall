import store from "state/store";
import { gain } from "state/slices/resSlice";
import { discharge } from "state/slices/itemsSlice";
import { ChargeUpgradeStatus } from "consts";

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
        if (state.items.charges.controller.charge <= 0)
            return false;
        store.dispatch(discharge({ id: "controller", charge: 1 }));
        return true;
    },

    buyEffect: () => {
        store.dispatch(gain({ hash: 1 }));
    }
}

export default def;