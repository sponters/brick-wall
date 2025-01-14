export function createBattery() {
    return {
        capacity: 200,
        charge: 0,
        chargeSpeed: 3,
    }
}

export function createPowerOutlet(batteryId) {
    return {
        battery: batteryId,
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