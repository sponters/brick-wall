import store from "state/store";
import { addItemInfo, selectRes } from "state/slices/inventorySlice";

const def = {
    upgradeId: 'hammerTechnique',

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
        return selectRes(state, "brick").history >= 20;
    },

    buyEffect: () => {
        store.dispatch(addItemInfo({ itemId: "hammer", value: { damage: 1 } }));
    }
}

export default def;