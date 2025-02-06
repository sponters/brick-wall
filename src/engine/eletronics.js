import store from "state/store";
import { init as initEletronics } from "state/slices/eletronicsSlice";

export function createBattery(id) {
    store.dispatch(initEletronics({
        id, initialState: {
            capacity: 1000,
            charge: 0,
            chargeSpeed: 5,
        }
    }));
    
}

export function createPowerOutlet(id, batteryId) {
    store.dispatch(initEletronics({
        id, initialState: {
            battery: batteryId,
        }
    }));
}

export function createLight(id, batteryId) {
    store.dispatch(initEletronics({
        id, initialState: {
            battery: batteryId,
            status: false,
            heat: 0,
            reached100Heat: false
        }
    }));
}