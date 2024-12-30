import { createSlice } from '@reduxjs/toolkit'

export const wallSlice = createSlice({
  name: 'wall',
  initialState: {
  },
  reducers: {
    hide: (state, action) => {
      state[action.payload.id] = false;
    },
    show: (state, action) => {
      state[action.payload.id] = true;
    },
  }
})

export const { hide, show } = wallSlice.actions

export default wallSlice.reducer