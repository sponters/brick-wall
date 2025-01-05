import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  hammer: {
    damage: 1
  },
  clayBrick: {
    maxHealth: 6,
    regenTime: 50,
    reward: {
      brick: 1,
    },
    expire: {
      brick: 1,
    }
  },
};

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    load: (state, action) => {
      return structuredClone(action.payload);
    }
  }
});

export const { load } = itemsSlice.actions;

export default itemsSlice.reducer;