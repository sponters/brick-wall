import { createSlice } from '@reduxjs/toolkit'

import { commonAdd, commonSet } from '../commonActions';

export const initialState = {
    connections: {
        port: {
            port: undefined,
            levelId: undefined,
            objId: undefined,
            type: undefined,
        },
        controller: false,
    }
};

export const improvementsSlice = createSlice({
    name: 'improvements',
    initialState,
    reducers: {
        unlock: (state, action) => {
            const { levelId, ownerId, upgradeId } = action.payload;
            state[levelId][ownerId][upgradeId].unlocked = true;
        },
        connect: (state, action) => {
            state.connections.port.port = action.payload.port;
            state.connections.port.levelId = action.payload.levelId;
            state.connections.port.objId = action.payload.objId;
            state.connections.port.type = action.payload.type;
        },
        disconnect: (state, action) => {
            if (state.connections.port.objId === action.payload) {
                state.connections.port.port = undefined;
                state.connections.port.levelId = undefined;
                state.connections.port.objId = undefined;
                state.connections.port.type = undefined;
            }
        },
        switchController: (state, action) => {
            if (state.connections.controller !== action.payload)
                state.connections.controller = action.payload;
        },
        addUpgrade: (state, action) => {
            const { levelId, ownerId, upgradeId, value } = action.payload;
            commonAdd(state[levelId][ownerId][upgradeId], value);
        },
        setUpgrade: (state, action) => {
            const { levelId, ownerId, upgradeId, value } = action.payload;
            commonSet(state, { [levelId]: { [ownerId]: { [upgradeId]: value } } });
        },
        load: (state, action) => {
            return structuredClone(action.payload);
        }
    }
});

export const selectConnectionPort = (state) => state.improvements.connections.port;
export const selectConnectionController = (state) => state.improvements.connections.controller;
export const selectUpgrade = (state, levelId, ownerId, upgradeId) => state.improvements[levelId]?.[ownerId]?.[upgradeId];
export const selectConnected = (state, objId, port) => 
    state.improvements.connections.port.port === port && state.improvements.connections.port.objId === objId;

export const { unlock, connect, disconnect, switchController, addUpgrade, setUpgrade, load } = improvementsSlice.actions;

export default improvementsSlice.reducer;