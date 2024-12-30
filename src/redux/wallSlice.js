import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
};

export const wallSlice = createSlice({
  name: 'wall',
  initialState,
  reducers: {
    hide: (state, action) => {
      state[action.payload.id] = false;
    },
    show: (state, action) => {
      state[action.payload.id] = true;
    },
    load: (state, action) => {
      console.log(action.payload);
      Object.assign(state, action.payload);
    }
  }
})

export const { hide, show, load } = wallSlice.actions

export default wallSlice.reducer