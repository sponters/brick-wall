import { createSlice } from '@reduxjs/toolkit'

import upgrades from '../../engine/upgrades'

export const initialState = {}
for (const [key, { initialState }] of Object.entries(upgrades))
  initialState[key] =  structuredClone(initialState);

export const upgradesSlice = createSlice({
  name: 'upgrades',
  initialState,
  reducers: {
    load: (state, action) => {
      return structuredClone(action.payload);
    }
  }
});

export const { load } = upgradesSlice.actions;

export default upgradesSlice.reducer;