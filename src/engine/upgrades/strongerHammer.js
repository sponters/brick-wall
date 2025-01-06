import store from "../../redux/store";
import { buildUpgrade } from "./upgrade";
import { hammerDamage } from "../../redux/slices/itemsSlice";

const def = {
    id: 'strongerHammer',
    title: 'Stronger hammer',

    initialState: {
        unlocked: true,
        level: 0,
        costDef: {
            brick: {
                base: 5,
                factor: 1.5,
            },
        },
    },
    
    buyEffect: () => {
        store.dispatch(hammerDamage(1));
    }
}

export default buildUpgrade(def);