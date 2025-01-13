export function createBattery() {
    return {
        capacity: 200,
        charge: 0
    }
}

export function createLight(batteryId) {
    return {
        battery: batteryId,
        status: false,
        heat: 0,
        reached100Heat: false
    }
}