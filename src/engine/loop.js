import { time } from './time'

const tickCallbacks = [
    new Set(),
    new Set(),
    new Set(),
    new Set(),
    new Set(),
];

export function addTickCallback(priority, callback) {
    tickCallbacks[priority].add(callback);
}

export function delTickCallback(priority, callback) {
    tickCallbacks[priority].delete(callback);
}

function gameLoop(ticks) {
    for(let i = 0; i < ticks; i++) {
        time.total += ticks;
        for (const callbacks of tickCallbacks)
            for (const callback of callbacks)
                callback();
    }
}

let lastTime = Date.now();

setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = currentTime - lastTime;

    const realTicks = Math.floor(deltaTime / 50);

    lastTime += realTicks * 50;

    const ticks = realTicks > 10 ? 10 : realTicks;

    if (ticks > 0)
        gameLoop(ticks);
}, 50);
