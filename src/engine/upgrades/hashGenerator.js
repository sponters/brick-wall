import store from "state/store";
import { buildUpgrade, calcCost } from "../upgrade";
import { gain } from "state/slices/resSlice";
import { discharge } from "state/slices/itemsSlice";
import { add } from "state/slices/upgradesSlice";

const def = {
    id: 'hashGenerator',

    initialState: {
        charge: 0,
        capacityDef: {
            capacity: {
                base: 100,
                factor: 1.3,
            },
        },
    },

    onTick: () => {
        const state = store.getState();
        if (state.upgrades.hashGenerator.charge > 0) {
            dispatch(discharge({ id: "controller", charge: 1 }));
            dispatch(add({ id: "hashGenerator", charge: 1 }));
        }
    },

    buyEffect: () => {
        store.dispatch(gain({ hash: 1}));
    }
}

export default buildUpgrade(def);