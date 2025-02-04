import store from 'state/store'
import { spend } from 'state/slices/resSlice'
import { add } from 'state/slices/upgradesSlice'


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

function buyDef({ id, buyEffect }) {
    const upgradeState = store.getState().upgrades[id];
    const cost = calcCost(upgradeState);
    const hasFunds = calcFunds(store.getState(), cost);

    if (!hasFunds)
        return;

    store.dispatch(spend(cost));
    store.dispatch(add({ [id]: { level: 1 } }));
    buyEffect();
}

export function buildUpgrade(def) {
    return {
        ...def,
        buy: () => buyDef(def),
    }
}

export function buildChargeUpgrade(def) {
    return {
        ...def,
    }
}