import { selectUpgrade } from "state/slices/improvementsSlice";
import { buyEffectLevelUpgrade } from "engine/upgrade";

const def = {
    upgradeId: 'brickInstaKill',

    initialState: {
        info: {
            unlocked: false,
            level: 0,
            maxLevel: 1,
            costDef: {
                brick: {
                    base: 30,
                    factor: 1,
                },
            },
        }
    },

    checkUnlock: (state, levelId, ownerId) => {
        return selectUpgrade(state, levelId, ownerId, "hammerTechnique")?.info?.level >= 8;
    },

    buyEffect: buyEffectLevelUpgrade
}

export default def;