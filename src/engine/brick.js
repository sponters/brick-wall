import store from '../redux/store'
import { time } from './time'
import { gain, expire } from '../redux/slices/resSlice'
import { set } from '../redux/slices/wallSlice'
import { addTickCallback } from './loop'

export function createBrick(type) {
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

    const health = brick.health - damage;

    if (health > 0) {
        store.dispatch(set({ [id]: { health }}));
        return;
    }
    
    if (health <= 0) {
        store.dispatch(gain(brick.reward));
        store.dispatch(set({ [id]: {
            health: 0,
            brokenUntil: time.total + store.getState().items[brick.type].regenTime,
        }}));
    }
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