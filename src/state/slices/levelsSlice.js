import { createSlice } from '@reduxjs/toolkit'

import { commonAdd, commonSet } from '../commonActions';

export const initialState = {
    defs: {
        clayBrick: {
            maxHealth: 4,
            damageResistance: 5,
            regenTicks: 200,
            regenCharge: 20,
            reward: {
                brick: 1,
            },
            expire: {
                brick: 1,
            }
        },
        unburntBrick: {
            maxHealth: 4,
            damageResistance: 0,
            regenTicks: 200,
            regenCharge: 20,
            reward: {
                brick: 1,
            },
            expire: {
                brick: 1,
            }
        },
    }
}

export const levelsSlice = createSlice({
    name: 'levels',
    initialState,
    reducers: {
        recharge: (state, action) => {
            const { levelId, batteryId } = action.payload;
            const battery = state[levelId].objects[batteryId];
            battery.charge += battery.chargeSpeed;
            if (battery.charge > battery.capacity)
                battery.charge = battery.capacity;
        },
        discharge: (state, action) => {
            const { levelId, batteryId, charge } = action.payload;
            const battery = state[levelId].objects[batteryId];
            battery.charge -= charge;
            if (battery.charge <= 0)
                battery.charge = 0;
        },
        light: (state, action) => {
            const { levelId, lightId, status } = action.payload;
            const lightState = state[levelId].objects[lightId];

            if (!lightState)
                return;

            if (lightState.status !== status)
                lightState.status = status;

            const heatDiff = status ? 2 : -1;

            if (((lightState.heat > 0) && (heatDiff < 0)) || ((lightState.heat < 1200) && (heatDiff > 0))) {
                lightState.heat += heatDiff;
                if (lightState.heat < 0)
                    lightState.heat = 0;
                if (lightState.heat > 1200)
                    lightState.heat = 1200;
                if (lightState.heat >= 100 && !lightState.reached100Heat)
                    lightState.reached100Heat = true;
            }
        },
        setLevels: (state, action) => { commonSet(state, action.payload) },
        setWall: (state, action) => {
            const { levelId, value } = action.payload;
            commonSet(state, { [levelId]: { bricks: value } });
        },
        setBrick: (state, action) => {
            const { levelId, brickId, value } = action.payload;
            commonSet(state, { [levelId]: { bricks: { [brickId]: value } } });
        },
        setObj: (state, action) => {
            const { levelId, objId, value } = action.payload;
            commonSet(state, { [levelId]: { objects: { [objId]: value } } });
        },
        addObj: (state, action) => {
            const { levelId, objId, value } = action.payload;
            commonAdd(state[levelId].objects[objId], value);
        },
        load: (state, action) => {
            return structuredClone(action.payload);
        }
    }
});

export const selectDef = (state, defId) => state.levels.defs[defId];
export const selectBrick = (state, levelId, brickId) => state.levels[levelId].bricks[brickId];
export const selectObj = (state, levelId, objId) => state.levels[levelId].objects[objId];

export const { recharge, discharge, light, setLevels, setWall, setBrick, setObj, addObj, load } = levelsSlice.actions;


export default levelsSlice.reducer;
