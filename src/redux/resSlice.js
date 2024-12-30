import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  bricks: 0
};

export const resSlice = createSlice({
  name: 'res',
  initialState,
  reducers: {
    add: (state, action) => {
      state[action.payload.type] += action.payload.amount;
      if (state[action.payload.type] < 0)
        state[action.payload.type] = 0;
    },
    load: (state, action) => {
      return action.payload;
    }
  }
});

export const { add, load } = resSlice.actions;

export default resSlice.reducer;