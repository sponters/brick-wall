import store from "state/store";
import { calcCost } from "../upgrade";
import { gain } from "state/slices/resSlice";
import { discharge } from "state/slices/itemsSlice";
import { createSelector } from "@reduxjs/toolkit";
import { ChargeUpgradeStatus } from "consts";

const def = {
    id: 'hashGenerator',

    initialState: {
        status: ChargeUpgradeStatus.pending,
        charge: 0,
        costDef: {},
        capacityDef: {
            capacity: {
                base: 100,
                factor: 1.3,
            }
        },
    },

    tickSpend: () => {
        const state = store.getState();
        if (state.items.charges.controller.charge <= 0)
            return false;
        store.dispatch(discharge({ id: "controller", charge: 1 }));
        return true;
    },

    selectCapacity: createSelector(
        [
            state => state.res.hash.cur,
            state => state.upgrades.hashGenerator.capacityDef,
        ],
        (curHash, capacityDef) => {
            const { capacity } = calcCost({ costDef: capacityDef, level: curHash});
            return capacity;
        }
    ),

    buyEffect: () => {
        store.dispatch(gain({ hash: 1 }));
    }
}

export default def;