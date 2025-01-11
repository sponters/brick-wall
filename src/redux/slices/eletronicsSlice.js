import { createSlice } from '@reduxjs/toolkit'

import { commonAdd } from '../commonActions';

export const initialState = {
    batteries: {
        b3: {
            capacity: 200,
            charge: 0
        }
    },
    lights: {
        l1: {
            battery: 'b3',
            status: false
        }
    }
};

export const eletronicsSlice = createSlice({
    name: 'eletronics',
    initialState,
    reducers: {
        recharge: (state, action) => {
            const battery = state.batteries[action.payload.id];
            battery.charge += action.payload.charge;
            if (battery.charge > battery.capacity)
                battery.charge = battery.capacity;
        },
        discharge: (state, action) => {
            const battery = state.batteries[action.payload.id];
            battery.charge -= action.payload.charge;
            if (battery.charge <= 0)
                battery.charge = 0;
        },
        light: (state, action) => {
            state.lights[action.payload.id].status = action.payload.status;
        },
        load: (state, action) => {
            return structuredClone(action.payload);
        }
    }
});

export const { recharge, discharge, light, load } = eletronicsSlice.actions;

export default eletronicsSlice.reducer;