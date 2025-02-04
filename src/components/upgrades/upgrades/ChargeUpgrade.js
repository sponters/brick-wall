import React, { useCallback } from 'react';
import store from 'state/store'

import { useDispatch, useSelector } from 'react-redux'

import { useState } from 'react';
import { discharge } from 'state/slices/eletronicsSlice';
import { recharge } from 'state/slices/itemsSlice';
import ProgressBarUpgrade from './ProgressBarUpgrade';
import useTick from 'hooks/useTick';

function ChargeUpgrade({ upgradeId, itemId, batteryId, output, input }) {
    const dispatch = useDispatch();

    const [active, setActive] = useState(false);

    const handleClick = () => {
        setActive(!active);
    }

    useTick(2, useCallback(() => {
        if (active) {
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
        }
    }, [active, batteryId, itemId, dispatch, output, input]));

    const charge = useSelector(state => state.items.charges[itemId].charge);
    const capacity = useSelector(state =>state.items.charges[itemId].capacity);

    return <ProgressBarUpgrade id={upgradeId} onClick={handleClick} progress={charge / capacity} />
}

export default ChargeUpgrade;
