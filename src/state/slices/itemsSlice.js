import { createSlice } from '@reduxjs/toolkit'

import { commonAdd, commonSet } from '../commonActions';

export const initialState = {
    ids: {
        hammer: {
            found: true,
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
            charged: false,
            ports: {
                "●": [1, 100, "chargeController"],
                "◘": 1
            }
        },
        flashlight: {
            found: false,
            charged: false,
            ports: {
                "●": [1, 1, "chargeFlashlight"],
            }
        },
    },
    charges: {
        flashlight: {
            charge: 0,
            capacity: 100,
        },
        controller: {
            charge: 0,
            capacity: 10000,
        }
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
        recharge: (state, action) => {
            const charges = state.charges[action.payload.id];
            const item = state.ids[action.payload.id];
            charges.charge += action.payload.charge;
            if (charges.charge >= charges.capacity) {
                charges.charge = charges.capacity;
                item.charged = true;
            }
        },
        discharge: (state, action) => {
            const charges = state.charges[action.payload.id];
            const item = state.ids[action.payload.id];
            charges.charge -= action.payload.charge;
            if (charges.charge < 0)
                charges.charge = 0;
            if (charges.charge < charges.capacity)
                item.charged = false;
        },
        load: (state, action) => {
            return structuredClone(action.payload);
        }
    }
});

export const { add, set, recharge, discharge, load } = itemsSlice.actions;

export default itemsSlice.reducer;