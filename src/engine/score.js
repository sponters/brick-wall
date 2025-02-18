import { selectUpgrade } from 'state/slices/improvementsSlice';
import { selectRes, selectScore } from 'state/slices/inventorySlice';


function selectBrickBase(score, type) { return score.info.bricks[type]; }
export function selectBrickBonus(state) {
    const upgradeMult = selectUpgrade(state, "global", "score", "scoreMoreBrickBonus")?.info.level || 0;
    return Math.floor(selectRes(state, "brick").cur / 10) * (1 + upgradeMult);
}

export function selectComboMult(score) { 
    return Math.round((score.info.combo.hits / 10 + 1) * 10) / 10;
}

export function computeBrickScore(state, type) {
    const score = selectScore(state);
    let points = selectBrickBase(score, type);

    if (score.info.brickBonusUnlocked)
        points += selectBrickBonus(state);

    if (score.info.comboUnlocked)
        points *= selectComboMult(score);

    return Math.floor(points);
}
