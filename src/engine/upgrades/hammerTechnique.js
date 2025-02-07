import { addItem } from "state/slices/inventorySlice";
import store from "state/store";

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
        store.dispatch(addItem({ itemId: "hammer", value: { damage: 1 } }));
    }
}

export default def;