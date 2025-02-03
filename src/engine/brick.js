import store from 'state/store'
import { gain, expire } from 'state/slices/resSlice'
import { set } from 'state/slices/wallSlice'
import { discharge } from "state/slices/eletronicsSlice";
import { addTickCallback } from './loop'

export function createBrickState(batteryId, type) {
    return {
        batteryId,
        type,
        maxHealth: store.getState().items.ids[type].maxHealth,
        health: store.getState().items.ids[type].maxHealth,
        brokenTicks: 0,
        brokenCharge: 0,
        reward: { ...store.getState().items.ids[type].reward },
        expire: { ...store.getState().items.ids[type].expire },
    }
};

export function hit(id) {
    const brick = store.getState().wall[id];
    const damage = store.getState().items.ids.hammer.damage;
    const brickDef = store.getState().items.ids[brick.type];

    const realDamage = damage - brickDef.damageResistance;
    if (realDamage <= 0)
        return false;

    const health = brick.health - realDamage;

    if (health > 0)
        store.dispatch(set({ [id]: { health }}));
    else {
        store.dispatch(gain(brick.reward));
        store.dispatch(set({ [id]: {
            health: 0,
            brokenTicks: brickDef.regenTicks,
            brokenCharge: brickDef.regenCharge,
        }}));
    }

    return true;
}

addTickCallback(3, () => {
    const batchDispatch = {};

    for (const [id, brick] of Object.entries(store.getState().wall)) {
        const state = store.getState();

        if ((brick.brokenTicks === 0) && (brick.brokenCharge === 0))
            continue;

        if (state.eletronics[brick.batteryId].charge <= 0)
            continue;

        const newValues = {
            brokenTicks: brick.brokenTicks,
            brokenCharge: brick.brokenCharge,
        };

        if (newValues.brokenTicks > 0)
            newValues.brokenTicks--;

        if ((newValues.brokenTicks === 0) && (newValues.brokenCharge > 0)) {
            const dischargeValue = Math.min(newValues.brokenCharge, state.eletronics[brick.batteryId].charge);

            if (dischargeValue > 0) {
                newValues.brokenCharge -= dischargeValue;
                store.dispatch(discharge({ id: brick.batteryId, charge: dischargeValue}));
            }
        }

        if ((newValues.brokenTicks === 0) && (newValues.brokenCharge === 0)) {
            store.dispatch(expire(brick.expire));
            newValues.health = state.items.ids[brick.type].maxHealth;
        }

        batchDispatch[id] = newValues;
    }

    if (Object.keys(batchDispatch).length > 0)
        store.dispatch(set(batchDispatch));
});