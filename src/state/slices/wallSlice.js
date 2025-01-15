import { createSlice } from '@reduxjs/toolkit'

import { commonSet } from '../commonActions';

export const initialState = {}

export const wallSlice = createSlice({
  name: 'wall',
  initialState,
  reducers: {
    set: (state, action) => commonSet(state, action.payload),
    init: (state, action) => {
      state[action.payload.id] = structuredClone(action.payload.initialState);
    },
    load: (state, action) => {
      return structuredClone(action.payload);
    }
  }
});

export const { set, update, init, load } = wallSlice.actions;

export default wallSlice.reducer;