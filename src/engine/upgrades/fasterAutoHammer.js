import { selectUpgrade } from "state/slices/improvementsSlice";
import { buyEffectLevelUpgrade } from "engine/upgrade";
import { addItemInfo, selectScore } from "state/slices/inventorySlice";
import store from "state/store";
import { jumpStart } from "consts";

const def = {
    upgradeId: 'fasterAutoHammer',

    initialState: {
        info: {
            unlocked: false,
            level: 0,
            maxLevel: 9,
            costDef: {
                brick: {
                    base: jumpStart ? 1: 30,
                    factor: 1.1,
                },
            },
        }
    },

    checkUnlock: (state, levelId, ownerId) => {
        return selectUpgrade(state, levelId, ownerId, "hammerTechnique")?.info?.level >= (jumpStart ? 1: 11) &&
            selectScore(state).info.level >= 4;
    },

    buyEffect: (levelId, onwerId, upgradeId) => {
        store.dispatch(addItemInfo({ itemId: "hammer", value: { cooldown: -100 } }));
        buyEffectLevelUpgrade(levelId, onwerId, upgradeId);
    }
}

export default def;