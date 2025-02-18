import { setObj } from "state/slices/levelsSlice";
import store from "state/store";

export const batteryBaseChargeSpeed = 5;

export function createBattery(levelId, objId) {
    store.dispatch(setObj({
        levelId, objId, value: {
            capacity: 1000,
            charge: 0,
            chargeSpeed: batteryBaseChargeSpeed,
        }
    }));
}

export function createPowerOutlet(levelId, objId, batteryId) {
    store.dispatch(setObj({
        levelId, objId, value: {
            batteryId,
        }
    }));
}

export function createLight(levelId, objId, batteryId) {
    store.dispatch(setObj({
        levelId, objId, value: {
            battery: batteryId,
            status: false,
            heat: 0,
            reached100Heat: false
        }
    }));
}