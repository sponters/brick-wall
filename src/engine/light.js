import { discharge, light } from "../redux/slices/eletronicsSlice";
import store from "../redux/store";
import { addTickCallback } from "./loop";

addTickCallback(() => {
    const eletronics = store.getState().eletronics;

    console.log(eletronics);

    for (const [id, value] of Object.entries(eletronics.lights)) {
        if (eletronics.batteries[value.battery].charge > 0) {
            store.dispatch(discharge({ id: value.battery, charge: 1 }))
            store.dispatch(light({ id, status: true }))
        } else {
            store.dispatch(light({ id, status: false }))
        }
    }
})