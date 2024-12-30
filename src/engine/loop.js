import { state } from './state'
import { tick as brickTick } from './brick'
import { tick as saveTick } from './save'

function gameLoop(ticks) {
    for(let i = 0; i < ticks; i++) {
        state.time.total += ticks;
        brickTick();
        saveTick();
    }
}

let lastTime = Date.now();

const id = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = currentTime - lastTime;

    const ticks = Math.floor(deltaTime / 50);

    lastTime += ticks * 50;
    
    if (ticks > 0)
        gameLoop(ticks);
}, 50);
