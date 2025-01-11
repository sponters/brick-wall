import { time } from './time'

const tickCallbacks = new Set();

export function addTickCallback(callback) {
    tickCallbacks.add(callback);
}

export function delTickCallback(callback) {
    tickCallbacks.delete(callback);
}

function gameLoop(ticks) {
    for(let i = 0; i < ticks; i++) {
        time.total += ticks;
        for (const callback of tickCallbacks)
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
