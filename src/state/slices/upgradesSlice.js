import { createSlice } from '@reduxjs/toolkit'

import upgrades from 'engine/upgrades'
import { commonAdd } from '../commonActions';

export const initialState = {}
for (const [key, { initialState: upgradeInitialState }] of Object.entries(upgrades)) {
  initialState[key] = structuredClone(upgradeInitialState);
}

export const upgradesSlice = createSlice({
  name: 'upgrades',
  initialState,
  reducers: {
    add: (state, action) => commonAdd(state, action.payload),
    unlock: (state, action) => { state[action.payload].unlock = true },
    load: (state, action) => {
      return structuredClone(action.payload);
    }
  }
});

export const { add, unlock, load } = upgradesSlice.actions;

export default upgradesSlice.reducer;