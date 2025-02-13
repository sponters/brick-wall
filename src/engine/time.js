export const initialTime = {
    total: 0
};
export const time = structuredClone(initialTime);

export const ticksPerSecond = 20;
export const tickMicroseconds = Math.round(1000 / ticksPerSecond);

export function speedTicksToSeconds(speed) {
    return speed * ticksPerSecond;
}

export function formatTicksToTime(ticks) {
    const time = Math.round((ticks / ticksPerSecond) * 10) / 10;
    const formatted = time.toFixed(1);
    return `${formatted}s`;
}