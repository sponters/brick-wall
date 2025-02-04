import React from 'react';
import store from 'state/store'

import { useDispatch, useSelector } from 'react-redux'

import { useCallback } from 'react';
import { discharge } from 'state/slices/eletronicsSlice';
import { recharge } from 'state/slices/itemsSlice';
import TimeUpgrade from './TimeUpgrade';

function ControllerUpgrade({ upgradeId, itemId, batteryId, output, input }) {
    const dispatch = useDispatch();

    const handleTick = useCallback(() => {
        const state = store.getState();
        const transferCharge = Math.min(
            output,
            state.eletronics[batteryId].charge,
            state.items.charges[itemId].capacity - state.items.charges[itemId].charge
        );
        if (transferCharge > 0) {
            dispatch(discharge({ id: batteryId, charge: output }));
            dispatch(recharge({ id: itemId, charge: input }))
        }
    }, [batteryId, itemId, dispatch, output, input]);

    const percentage = useSelector(state =>
        Math.floor(state.items.charges[itemId].charge * 100 / state.items.charges[itemId].capacity));

    return <TimeUpgrade id={upgradeId} onTick={handleTick} percentage={percentage} />
}

export default ControllerUpgrade;
