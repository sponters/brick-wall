import store from "state/store";
import { addItemInfo, selectScore } from "state/slices/inventorySlice";
import { buyEffectLevelUpgrade } from "engine/upgrade";

const def = {
    upgradeId: 'hammerTechnique',

    initialState: {
        info: {
            unlocked: false,
            level: 0,
            costDef: {
                brick: {
                    base: 3,
                    factor: 1.3,
                },
            },
        }
    },

    checkUnlock: state => {
        return selectScore(state).info.level >= 2;
    },

    buyEffect: (levelId, onwerId, upgradeId) => {
        store.dispatch(addItemInfo({ itemId: "hammer", value: { damage: 1 } }));
        buyEffectLevelUpgrade(levelId, onwerId, upgradeId);
    }
}

export default def;