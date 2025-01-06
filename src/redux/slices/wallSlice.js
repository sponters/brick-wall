import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
};

export const wallSlice = createSlice({
  name: 'wall',
  initialState,
  reducers: {
    update: (state, action) => {
      state[action.payload.id] = { 
        ...state[action.payload.id], 
        ...action.payload.change
      };
    },
    init: (state, action) => {
      const current = state[action.payload.id];
      const initialState = action.payload.initialState;
      state[action.payload.id] = structuredClone(current ?? initialState);
    },
    load: (state, action) => {
      return structuredClone(action.payload);
    }
  }
});

export const { update, init, load } = wallSlice.actions;

export default wallSlice.reducer;