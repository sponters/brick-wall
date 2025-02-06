import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
    port: {
        port: undefined,
        id: undefined,
        type: undefined,
    },
    controller: false,
};

export const connectionSlice = createSlice({
    name: 'connection',
    initialState,
    reducers: {
        connect: (state, action) => {
            state.port.port = action.payload.port;
            state.port.id = action.payload.id;
            state.port.type = action.payload.type;
        },
        disconnect: (state, action) => {
            if (state.id === action.payload) {
                state.port.port = undefined;
                state.port.id = undefined;
                state.port.type = undefined;
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