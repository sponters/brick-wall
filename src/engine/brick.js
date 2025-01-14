import store from '../redux/store'
import { time } from './time'
import { gain, expire } from '../redux/slices/resSlice'
import { set } from '../redux/slices/wallSlice'
import { addTickCallback } from './loop'

export function createBrickState(type) {
    return {
        type,
        maxHealth: store.getState().items[type].maxHealth,
        health: store.getState().items[type].maxHealth,
        brokenUntil: 0,
        reward: { ...store.getState().items[type].reward },
        expire: { ...store.getState().items[type].expire },
    }
};

export function hit(id) {
    const brick = store.getState().wall[id];
    const damage = store.getState().items.hammer.damage;
    const brickDef = store.getState().items[brick.type];

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
            brokenUntil: time.total + brickDef.regenTime,
        }}));
    }

    return true;
}

addTickCallback(() => {
    for (const [id, brick] of Object.entries(store.getState().wall)) {
        if ((brick.brokenUntil > 0) && (brick.brokenUntil <= time.total)) {
            store.dispatch(expire(brick.expire));
            store.dispatch(set({ [id]: {
                health: store.getState().items[brick.type].maxHealth,
                brokenUntil: 0,
            }}));
        }
    }
});