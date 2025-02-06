import React from 'react';
import store from 'state/store'

import { useDispatch, useSelector } from 'react-redux'

import { useCallback } from 'react';
import ProgressBarUpgrade from './ProgressBarUpgrade';
import { calcCost, calcFunds } from 'engine/upgrade';
import { add, set } from 'state/slices/upgradesSlice';
import { spend } from 'state/slices/resSlice';
import useTick from 'hooks/useTick';
import upgrades from 'engine/upgrades';
import { ChargeUpgradeStatus } from 'consts';
import { createSelector } from '@reduxjs/toolkit';

const selectCapacity = createSelector(
    [
        (state, ownerId, upgradeId) => upgrades[upgradeId].selectLevel(state),
        (state, ownerId, upgradeId) => state.upgrades[upgradeId].capacityDef,
    ],
    (level, costDef) => {
        const { capacity } = calcCost({ costDef, level });
        return capacity;
    }
);

function ControllerUpgrade({ ownerId, upgradeId }) {
    const dispatch = useDispatch();

    const status = useSelector(state => state.upgrades[ownerId][upgradeId].status);

    const handleClick = () => {
        if (status === ChargeUpgradeStatus.paused) {
            dispatch(set({ [ownerId]: { [upgradeId]: { status: ChargeUpgradeStatus.charging } } }));
            return;
        }
        if (status === ChargeUpgradeStatus.charging) {
            dispatch(set({ [ownerId]: { [upgradeId]: { status: ChargeUpgradeStatus.paused } } }));
            return;
        }

        const upgradeState = store.getState().upgrades[ownerId][upgradeId];
        const cost = calcCost(upgradeState);
        const hasFunds = calcFunds(store.getState(), cost);

        if (!hasFunds)
            return;

        store.dispatch(spend(cost));
        dispatch(set({ [ownerId]: { [upgradeId]: { status: ChargeUpgradeStatus.charging } } }));
    }

    useTick(3, useCallback(() => {
        const state = store.getState();
        const charge = state.upgrades[ownerId][upgradeId].charge;
        const capacity = selectCapacity(state, upgradeId);

        if (charge >= capacity) {
            dispatch(set({
                [upgradeId]: {
                    charge: charge - capacity,
                    status: ChargeUpgradeStatus.pending
                }
            }));
            upgrades[upgradeId].buyEffect();

            return;
        }

        if (status !== ChargeUpgradeStatus.charging)
            return;

        if (!upgrades[upgradeId].tickSpend())
            return;

        dispatch(add({ [upgradeId]: { charge: 1 } }));
    }, [ownerId, upgradeId, status, dispatch]));

    const charge = useSelector(state => state.upgrades[upgradeId].charge);
    const capacity = useSelector(state => selectCapacity(state, upgradeId));

    return <ProgressBarUpgrade id={upgradeId} onClick={handleClick} progress={charge / capacity} />
}

export default ControllerUpgrade;
