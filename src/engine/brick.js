import store from '../redux/store'
import { state } from './state'
import { add } from '../redux/resSlice'
import { hide, show } from '../redux/wallSlice'

export function hit(id) {
    store.dispatch(add({ type: 'bricks', amount: 1}));
    store.dispatch(hide({ id }));
    state.wall[id] = {
        ...state.wall[id] ? state.wall[id] : {},
        brokenUntil: state.time.total + 50
    }
}

export function tick() {
    for (const [id, brick] of Object.entries(state.wall)) {
        if (brick.brokenUntil == state.time.total) {
            store.dispatch(add({ type: 'bricks', amount: -1}));
            store.dispatch(show({ id }));
        }
    }
}
