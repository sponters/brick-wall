export function calcCost({ costDef, level }) {
    const cost = {}
    for(const [resName, def] of Object.entries(costDef))
        cost[resName] = Math.floor(def.base * Math.pow(def.factor, level));
    return cost;
}

export function calcFunds(state, cost) {
    for(const [resName, amount] of Object.entries(cost))
        if (state.res[resName].cur < amount)
            return false;
    return true;
}
