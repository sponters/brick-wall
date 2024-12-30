import { createSlice } from '@reduxjs/toolkit'

export const resSlice = createSlice({
  name: 'res',
  initialState: {
    bricks: 0
  },
  reducers: {
    add: (state, action) => {
      state[action.payload.type] += action.payload.amount;
      if (state[action.payload.type] < 0)
        state[action.payload.type] = 0;
    },
  }
})

export const { add } = resSlice.actions

export default resSlice.reducer