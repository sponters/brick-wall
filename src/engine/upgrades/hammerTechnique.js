import store from "../../redux/store";
import { buildUpgrade } from "../upgrade";
import { add } from "../../redux/slices/itemsSlice";

const def = {
    id: 'hammerTechnique',

    initialState: {
        unlocked: true,
        level: 0,
        costDef: {
            brick: {
                base: 2,
                factor: 1.2,
            },
        },
    },
    
    buyEffect: () => {
        store.dispatch(add({ hammer: { damage: 1 } }));
    }
}

export default buildUpgrade(def);