export const initialTime = {
    total: 0
};
export const time = structuredClone(initialTime);

export const ticksPerSecond = 20;
export const tickMicroseconds = Math.round(1000 / ticksPerSecond);

export function speedTicksToSeconds(speed) {
    return speed * ticksPerSecond;
}

