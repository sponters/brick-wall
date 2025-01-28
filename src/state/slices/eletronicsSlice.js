import { createSlice } from '@reduxjs/toolkit'

export const initialState = {}

export const eletronicsSlice = createSlice({
    name: 'eletronics',
    initialState,
    reducers: {
        recharge: (state, action) => {
            const battery = state[action.payload];
            battery.charge += battery.chargeSpeed;
            if (battery.charge > battery.capacity)
                battery.charge = battery.capacity;
        },
        discharge: (state, action) => {
            const battery = state[action.payload.id];
            battery.charge -= action.payload.charge;
            if (battery.charge <= 0)
                battery.charge = 0;
        },
        light: (state, action) => {
            const { id, status } = action.payload;
            const lightState = state[id];
            
            if (!lightState)
                return;

            if (lightState.status !== status)
                lightState.status = status;

            const heatDiff = status ? 2 : -1;

            if (((lightState.heat > 0) && (heatDiff < 0)) || ((lightState.heat < 1200) && (heatDiff > 0))) {
                lightState.heat += heatDiff;
                if (lightState.heat < 0)
                    lightState.heat = 0;
                if (lightState.heat > 1200)
                    lightState.heat = 1200;
                if (lightState.heat >= 100 && !lightState.reached100Heat)
                    lightState.reached100Heat = true;
            }
        },
        init: (state, action) => {
            state[action.payload.id] = structuredClone(action.payload.initialState);
        },
        load: (state, action) => {
            return structuredClone(action.payload);
        }
    }
});

export const { recharge, discharge, light, init, load } = eletronicsSlice.actions;

export default eletronicsSlice.reducer;