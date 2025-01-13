import store from "../../redux/store";
import { buildUpgrade } from "../upgrade";
import { add } from "../../redux/slices/itemsSlice";

const def = {
    id: 'hammerTechnique',

    initialState: {
        unlocked: false,
        level: 0,
        costDef: {
            brick: {
                base: 3,
                factor: 1.3,
            },
        },
    },

    checkUnlock: state => {
        return state.res.brick.history >= 20;
    },
    
    buyEffect: () => {
        store.dispatch(add({ hammer: { damage: 1 } }));
    }
}

export default buildUpgrade(def);