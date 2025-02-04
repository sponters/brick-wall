import { createSlice } from '@reduxjs/toolkit'

import upgrades from 'engine/upgrades'
import { commonAdd, commonSet } from '../commonActions';

export const initialState = { tabUnlocked: false };
for (const [key, { initialState: upgradeInitialState }] of Object.entries(upgrades)) {
  initialState[key] = structuredClone(upgradeInitialState);
}

export const upgradesSlice = createSlice({
  name: 'upgrades',
  initialState,
  reducers: {
    add: (state, action) => commonAdd(state, action.payload),
    set: (state, action) => commonSet(state, action.payload),
    unlock: (state, action) => {
      state[action.payload].unlock = true;
      if (!state.tabUnlocked)
        state.tabUnlocked = true;
    },
    load: (state, action) => {
      return structuredClone(action.payload);
    }
  }
});

export const { add, set, unlock, load } = upgradesSlice.actions;

export default upgradesSlice.reducer;