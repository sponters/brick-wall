import React, { useCallback } from 'react';
import store from 'state/store'

import { useDispatch, useSelector } from 'react-redux'

import { useState } from 'react';
import ProgressBar from '../ProgressBar';
import useTick from 'hooks/useTick';
import { discharge, selectObj } from 'state/slices/levelsSlice';
import { recharge, selectItemTick } from 'state/slices/inventorySlice';

function ChargeUpgrade({ upgradeId, itemId, levelId, batteryId, output, input }) {
    const dispatch = useDispatch();

    const [active, setActive] = useState(false);

    useTick(2, useCallback(() => {
        if (active) {
            const state = store.getState();
            const transferCharge = Math.min(
                output,
                selectObj(state, levelId, batteryId).charge,
                selectItemTick(state, itemId).capacity - selectItemTick(state, itemId).charge
            );
            if (transferCharge > 0) {
                dispatch(discharge({ levelId, batteryId, charge: transferCharge }));
                dispatch(recharge({ itemId, charge: input }))
            }
        }
    }, [active, levelId, batteryId, itemId, dispatch, output, input]));

    const tick = useSelector(state => selectItemTick(state, itemId));

    return <ProgressBar upgradeId={upgradeId} onClick={() => setActive(!active)} progress={tick.charge / tick.capacity} />
}

export default ChargeUpgrade;
