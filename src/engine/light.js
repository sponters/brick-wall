import { discharge, light } from "state/slices/eletronicsSlice";
import store from "state/store";
import { addTickCallback } from "./loop";

addTickCallback(() => {
    const eletronics = store.getState().eletronics;

    for (const [id, value] of Object.entries(eletronics.lights)) {
        if (eletronics.batteries[value.battery].charge > 0) {
            store.dispatch(discharge({ id: value.battery, charge: 1 }))
            store.dispatch(light({ id, status: true }))
        } else {
            store.dispatch(light({ id, status: false }))
        }
    }
})