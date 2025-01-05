import store from '../redux/store'
import { time } from './time'
import { gain, expire } from '../redux/slices/resSlice'
import { update } from '../redux/slices/wallSlice'

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
        store.dispatch(update({ id, change: { health } }));
        return;
    }
    
    if (health <= 0) {
        store.dispatch(gain(brick.reward));
        store.dispatch(update({ id, change: {
            health: 0,
            brokenUntil: time.total + store.getState().items[brick.type].regenTime,
        }}));
    }
}

export function tick() {
    for (const [id, brick] of Object.entries(store.getState().wall)) {
        if ((brick.brokenUntil > 0) && (brick.brokenUntil <= time.total)) {
            store.dispatch(expire(brick.expire));
            store.dispatch(update({ id, change: {
                health: store.getState().items[brick.type].maxHealth,
                brokenUntil: 0,
            }}));
        }
    }
}
