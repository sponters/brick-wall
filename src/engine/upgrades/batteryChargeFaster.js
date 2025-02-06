import store from "state/store";
import { gain } from "state/slices/resSlice";
import { discharge } from "state/slices/itemsSlice";
import { ChargeUpgradeStatus } from "consts";

const def = {
    id: 'chargeFaster',

    initialState: {
        status: ChargeUpgradeStatus.pending,
        charge: 0,
        level: 0,
        costDef: {
            brick: {
                base: 10,
                factor: 2,
            },
            hash: {
                base: 5,
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

    selectLevel: (state, id) => state.upgrades[id].chargeFaster.level,

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