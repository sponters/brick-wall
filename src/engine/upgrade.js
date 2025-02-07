import { selectRes } from "state/slices/inventorySlice";

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
