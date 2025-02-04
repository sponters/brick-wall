import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
    port: undefined,
    id: undefined,
    controller: false,
};

export const connectionSlice = createSlice({
    name: 'connection',
    initialState,
    reducers: {
        connect: (state, action) => {
            state.port = action.payload.port;
            state.id = action.payload.id;
        },
        disconnect: (state, action) => {
            if (state.id === action.payload) {
                state.port = undefined;
                state.id = undefined;
            }
        },
        controller: (state, action) => {
            if (state.controller !== action.payload)
                state.controller = action.payload;
        },
        load: (state, action) => {
            return structuredClone(action.payload);
        }
    }
});

export const { connect, disconnect, controller, load } = connectionSlice.actions;

export default connectionSlice.reducer;