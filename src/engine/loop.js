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

    const ticks = Math.floor(deltaTime / 50);

    lastTime += ticks * 50;
    
    if (ticks > 0)
        gameLoop(ticks);
}, 50);
