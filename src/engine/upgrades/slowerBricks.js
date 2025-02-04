import store from "state/store";
import { buildUpgrade } from "../upgrade";
import { add } from "state/slices/itemsSlice";

const def = {
    id: 'slowerBricks',

    initialState: {
        unlocked: false,
        level: 0,
        costDef: {
            brick: {
                base: 5,
                factor: 1.5,
            },
        },
    },

    checkUnlock: () => {
        return false;
    },

    buyEffect: () => {
        store.dispatch(add({ clayBrick: { regenTicks: 20 } }));
    }
}

export default buildUpgrade(def);