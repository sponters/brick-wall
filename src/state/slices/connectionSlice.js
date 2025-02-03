import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
    port: undefined,
    id: undefined,
    extra: undefined
};

export const connectionSlice = createSlice({
    name: 'connection',
    initialState,
    reducers: {
        connect: (state, action) => {
            state.port = action.payload.port;
            state.id = action.payload.id;
            state.extra = action.payload.extra;
        },
        disconnect: (state, action) => {
            if (state.id === action.payload) {
                state.port = undefined;
                state.id = undefined;
                state.extra = undefined;
            }
        },
        load: (state, action) => {
            return structuredClone(action.payload);
        }
    }
});

export const { connect, disconnect, load } = connectionSlice.actions;

export default connectionSlice.reducer;