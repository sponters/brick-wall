import { createSlice } from '@reduxjs/toolkit'

import upgrades from '../../engine/upgrades'

export const initialState = {}
for (const [key, { initialState: upgradeInitialState }] of Object.entries(upgrades)) {
  initialState[key] = structuredClone(upgradeInitialState);
}

export const upgradesSlice = createSlice({
  name: 'upgrades',
  initialState,
  reducers: {
    level: (state, action) => {
      state[action.payload].level += 1;
    },
    load: (state, action) => {
      return structuredClone(action.payload);
    }
  }
});

export const { level, load } = upgradesSlice.actions;

export default upgradesSlice.reducer;