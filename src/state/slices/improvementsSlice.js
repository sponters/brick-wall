import { createSlice } from '@reduxjs/toolkit'

import upgrades from 'engine/upgrades'
import { commonAdd, commonSet } from '../commonActions';

export const initialState = {
    tabUnlocked: false,
    global: {
        player: {
            hammerTechnique: structuredClone(upgrades.hammerTechnique.initialState),
        },
        controller: {
            hashGenerator: structuredClone(upgrades.hashGenerator.initialState),
        },
    },
    connections: {
        port: {
            port: undefined,
            id: undefined,
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
            const { levelId, ownerId, upgradeid } = action.payload;
            state[levelId][ownerId][upgradeid].unlock = true;
            if (!state.tabUnlocked)
                state.tabUnlocked = true;
        },
        connect: (state, action) => {
            state.connections.port.port = action.payload.port;
            state.connections.port.id = action.payload.id;
            state.connections.port.type = action.payload.type;
        },
        disconnect: (state, action) => {
            if (state.connections.port.id === action.payload) {
                state.connections.port.port = undefined;
                state.connections.port.id = undefined;
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
            commonSet(state[levelId][ownerId][upgradeId], value);
        },
        load: (state, action) => {
            return structuredClone(action.payload);
        }
    }
});

export const selectTabUnlocked = (state) => state.improvements.tabUnlocked;
export const selectConnectionPort = (state) => state.improvements.connections.port;
export const selectConnectionController = (state) => state.improvements.connections.controller;
export const selectUpgrade = (state, levelId, ownerId, upgradeId) => state.improvements[levelId][ownerId][upgradeId];

export const { unlock, connect, disconnect, switchController, addUpgrade, setUpgrade, load } = improvementsSlice.actions;

export default improvementsSlice.reducer;