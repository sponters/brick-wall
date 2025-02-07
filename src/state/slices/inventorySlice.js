import { createSlice } from '@reduxjs/toolkit'

import { commonAdd, commonSet } from '../commonActions';

export const initialState = {
    res: {
        brick: {
            unlocked: false,
            unlockHistory: 5,
            history: 0,
            best: 0,
            total: 0,
            cur: 0,
        },
        hash: {
            unlocked: false,
            unlockHistory: 1,
            history: 0,
            best: 0,
            total: 0,
            cur: 0,
        }
    },
    items: {
        hammer: {
            found: true,
            damage: 1
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

export const inventorySlice = createSlice({
    name: 'inventory',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const { itemId, value } = action.payload;
            commonAdd(state.items[itemId], value);
        },
        setItem: (state, action) => {
            const { itemId, value } = action.payload;
            commonSet(state.items[itemId], value);
        },
        recharge: (state, action) => {
            const { itemId, charge } = action.payload;
            const charges = state.charges[itemId];
            const item = state.items[itemId];
            charges.charge += charge;
            if (charges.charge >= charges.capacity) {
                charges.charge = charges.capacity;
                item.charged = true;
            }
        },
        discharge: (state, action) => {
            const { itemId, charge } = action.payload;
            const charges = state.charges[itemId];
            const item = state.items[itemId];
            charges.charge -= charge;
            if (charges.charge < 0)
                charges.charge = 0;
            if (charges.charge < charges.capacity)
                item.charged = false;
        },
        gain: (state, action) => {
            for (const [resId, amount] of Object.entries(action.payload)) {
                const res = state.res[resId];
                res.history += amount;
                res.total += amount;
                res.cur += amount;
                res.best = Math.max(res.best, res.total);
                res.unlocked = (res.history >= res.unlockHistory);
            }
        },
        spend: (state, action) => {
            for (const [resId, amount] of Object.entries(action.payload)) {
                const res = state.res[resId];
                res.cur -= amount;
                if (res.cur < 0)
                    res.cur = 0;
            }
        },
        expire: (state, action) => {
            for (const [resId, amount] of Object.entries(action.payload)) {
                const res = state.res[resId];
                res.total -= amount;
                if (res.total < res.cur)
                    res.cur = res.total;
            }
        },
        load: (state, action) => {
            return structuredClone(action.payload);
        }
    }
});

export const selectRes = (state, resId) => state.inventory.res[resId];
export const selectItem = (state, itemId) => state.inventory.items[itemId];
export const selectCharge = (state, itemId) => state.inventory.charges[itemId];

export const { addItem, setItem, recharge, discharge, gain, spend, expire, load } = inventorySlice.actions;

export default inventorySlice.reducer;
