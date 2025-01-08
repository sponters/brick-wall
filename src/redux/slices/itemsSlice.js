import { createSlice } from '@reduxjs/toolkit'

import { commonAdd } from '../commonActions';

export const initialState = {
  hammer: {
    damage: 1
  },
  clayBrick: {
    maxHealth: 6,
    regenTime: 6000,
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
    add: (state, action) => {
      commonAdd(state, action.payload);
    },
    load: (state, action) => {
      return structuredClone(action.payload);
    }
  }
});

export const { add, load } = itemsSlice.actions;

export default itemsSlice.reducer;