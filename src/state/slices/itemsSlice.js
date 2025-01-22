import { createSlice } from '@reduxjs/toolkit'

import { commonAdd, commonSet } from '../commonActions';

export const initialState = {
    hammer: {
        damage: 1
    },
    clayBrick: {
        maxHealth: 4,
        damageResistance: 5,
        regenTicks: 200,
        regenCharge: 20,
        reward: {
            brick: 1,
        },
        expire: {
            brick: 1,
        }
    },
    unburntBrick: {
        maxHealth: 4,
        damageResistance: 0,
        regenTicks: 200,
        regenCharge: 20,
        reward: {
            brick: 1,
        },
        expire: {
            brick: 1,
        }
    },
    controller: {
        found: false,
    }
};

export const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        add: (state, action) => {
            commonAdd(state, action.payload);
        },
        set: (state, action) => {
            commonSet(state, action.payload);
        },
        load: (state, action) => {
            return structuredClone(action.payload);
        }
    }
});

export const { add, set, load } = itemsSlice.actions;

export default itemsSlice.reducer;