import { createSlice } from '@reduxjs/toolkit'

import { commonAdd, commonSet } from '../commonActions';

export const scoreLevelProgression = [
    200,
    1000,
    5000,
    10000,
    50000,
]

export const initialState = {
    score: {
        info: {
            level: 0,
            comboUnlocked: false,
            brickBonusUnlocked: false,
            combo: {
                hits: 0,
                max: 20
            },
            bricks: {
                unburntBrick: 10,
                clayBrickL2: 20,
                clayBrickL1: 30,
            }
        },
        total: 0,
    },
    res: {
        tabUnlocked: false,
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
        tabUnlocked: false,
        hammer: {
            found: false,
            damage: 1,
            cooldown: 1000
        },
        controller: {
            found: false,
            charged: false,
            hasCharge: false,
            ports: {
                "●": [1, 100, "chargeController"],
                "◘": 1
            }
        },
        flashlight: {
            found: false,
            charged: false,
            hasCharge: false,
            ports: {
                "●": [1, 1, "chargeFlashlight"],
            }
        },
    },
    tick: {
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
        addItemInfo: (state, action) => {
            const { itemId, value } = action.payload;
            commonAdd(state.items[itemId], value);
        },
        setItemInfo: (state, action) => {
            const { itemId, value } = action.payload;
            commonSet(state.items[itemId], value);
        },
        findItem: (state, action) => {
            state.items[action.payload].found = true;
            if (!state.items.tabUnlocked)
                state.items.tabUnlocked = true;
        },
        recharge: (state, action) => {
            const { itemId, charge } = action.payload;
            const tick = state.tick[itemId];
            const item = state.items[itemId];
            tick.charge += charge;
            if (tick.charge > tick.capacity)
                tick.charge = tick.capacity;
            if (!item.charged && tick.charge >= tick.capacity)
                item.charged = true;
            if (!item.hasCharge)
                item.hasCharge = true;
        },
        discharge: (state, action) => {
            const { itemId, charge } = action.payload;
            const tick = state.tick[itemId];
            const item = state.items[itemId];
            tick.charge -= charge;
            if (tick.charge < 0)
                tick.charge = 0;
            if (item.hasCharge && tick.charge <= 0)
                item.hasCharge = false;
            if (item.charged)
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
                if (res.unlocked && !state.res.tabUnlocked)
                    state.res.tabUnlocked = true;
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
        addScore: (state, action) => {
            commonAdd(state.score, action.payload);
            while (state.score.total >= scoreLevelProgression[state.score.info.level])
                state.score.info.level += 1;
            if (state.score.info.level >= 1 && !state.score.info.comboUnlocked)
                state.score.info.comboUnlocked = true;
            if (state.score.info.level >= 3 && !state.score.info.brickBonusUnlocked)
                state.score.info.brickBonusUnlocked = true;
            if (state.score.info.combo.hits > state.score.info.combo.max)
                state.score.info.combo.hits = state.score.info.combo.max;
        },
        setScore: (state, action) => {
            commonSet(state.score, action.payload);
        },
        load: (state, action) => {
            return structuredClone(action.payload);
        }
    }
});

export const selectRes = (state, resId) => state.inventory.res[resId];
export const selectItemInfo = (state, itemId) => state.inventory.items[itemId];
export const selectItemTick = (state, itemId) => state.inventory.tick[itemId];
export const selectAllItems = (state) => state.inventory.items;
export const selectAllIRes = (state) => state.inventory.res;
export const selectScore = (state) => state.inventory.score;

export const { addItemInfo, setItemInfo, findItem, recharge, discharge, gain, spend, expire, addScore, setScore, load } = inventorySlice.actions;

export default inventorySlice.reducer;
