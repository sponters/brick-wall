import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  brick: {
    unlocked: false,
    unlockHistory: 5,
    history: 0,
    best: 0,
    total: 0,
    cur: 0,
  }
};

export const resSlice = createSlice({
  name: 'res',
  initialState,
  reducers: {
    gain: (state, action) => {
      for (const [resName, amount] of Object.entries(action.payload)) {
        state[resName].history += amount;
        state[resName].total += amount;
        state[resName].cur += amount;
        state[resName].best = Math.max(state[resName].best, state[resName].total);
        state[resName].unlocked = (state[resName].history >= state[resName].unlockHistory);
      }
    },
    spend: (state, action) => {
      for (const [resName, amount] of Object.entries(action.payload)) {
        state[resName].cur -= amount;
        if (state[resName].cur < 0)
          state[resName].cur = 0;
      }
    },
    expire: (state, action) => {
      for (const [resName, amount] of Object.entries(action.payload)) {
        state[resName].total -= amount;
        if (state[resName].total < state[resName].cur)
          state[resName].cur = state[resName].total;
      }
    },
    load: (state, action) => {
      return structuredClone(action.payload);
    }
  }
});

export const { gain, spend, expire, load } = resSlice.actions;

export default resSlice.reducer;