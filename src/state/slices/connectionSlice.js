import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
    port: undefined,
    id: undefined,
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
        load: (state, action) => {
            return structuredClone(action.payload);
        }
    }
});

export const { connect, disconnect, load } = connectionSlice.actions;

export default connectionSlice.reducer;