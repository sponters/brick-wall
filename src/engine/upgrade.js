import { addUpgrade, selectUpgrade } from "state/slices/improvementsSlice";
import { discharge, selectItemTick, selectRes, spend } from "state/slices/inventorySlice";
import store from "state/store";

export function calcCost({ costDef, level }) {
    const cost = {}
    for(const [resId, def] of Object.entries(costDef))
        cost[resId] = Math.floor(def.base * Math.pow(def.factor, level));
    return cost;
}

export function selectHasFunds(state, cost) {
    for(const [resId, amount] of Object.entries(cost))
        if (selectRes(state, resId).cur < amount)
            return false;
    return true;
}

export function defaultSelectCapacityLevel(state, levelId, ownerId, upgradeId) {
    return selectUpgrade(state, levelId, ownerId, upgradeId).info.level;
}

export function defaultControllerTickSpend(levelId, ownerId, upgradeId) {
    const state = store.getState();
    if (selectItemTick(state, "controller").charge <= 0)
        return false;
    const upgrade = selectUpgrade(state, levelId, ownerId, upgradeId)
    if (upgrade.info.tickCost) {
        if (!selectHasFunds(state, upgrade.info.tickCost))
            return false;
        store.dispatch(spend(upgrade.info.tickCost));
    }
    const charge = upgrade.info.dischargeSpeed ? upgrade.info.dischargeSpeed : upgrade.info.chargeSpeed;
    store.dispatch(discharge({ itemId: "controller", charge }));
    return true;
}

export function buyEffectLevelUpgrade(levelId, ownerId, upgradeId) {
    store.dispatch(addUpgrade({ levelId, ownerId, upgradeId, value: { info: { level: 1 } } }));
}
