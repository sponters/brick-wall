import { createSlice } from '@reduxjs/toolkit'

import upgrades from 'engine/upgrades'
import { commonAdd, commonSet } from '../commonActions';
import { EletronicTypes } from 'consts';

export const initialState = { 
    tabUnlocked: false,
    [EletronicTypes.controller]: {}
};

function initState() {
    for (const [key, { initialState: upgradeInitialState }] of Object.entries(upgrades)) {
        if (upgradeInitialState)
            initialState[key] = structuredClone(upgradeInitialState);
    }
    for (const [key, { initialState: upgradeInitialState }] of Object.entries(upgrades[[EletronicTypes.controller]])) {
        if (upgradeInitialState)
            initialState[EletronicTypes.controller][key] = structuredClone(upgradeInitialState);
    }
}
initState();

export const upgradesSlice = createSlice({
    name: 'upgrades',
    initialState,
    reducers: {
        add: (state, action) => commonAdd(state, action.payload),
        set: (state, action) => commonSet(state, action.payload),
        unlock: (state, action) => {
            state[action.payload].unlock = true;
            if (!state.tabUnlocked)
                state.tabUnlocked = true;
        },
        init: (state, action) => {
            state[action.payload.id] = structuredClone(action.payload.initialState);
        },
        load: (state, action) => {
            return structuredClone(action.payload);
        }
    }
});

export const { add, set, unlock, init, load } = upgradesSlice.actions;

export default upgradesSlice.reducer;