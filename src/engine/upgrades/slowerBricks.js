import store from "../../redux/store";
import { buildUpgrade } from "../upgrade";
import { add } from "../../redux/slices/itemsSlice";

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

    checkUnlock: state => {
        return false;
    },

    buyEffect: () => {
        store.dispatch(add({ clayBrick: { regenTime: 20 } }));
    }
}

export default buildUpgrade(def);