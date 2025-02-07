import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import store from 'state/store'

import useTick from 'hooks/useTick';
import useUpgradeCheckUnlock from 'hooks/useImprovementCheckUnlock';
import { calcCost, calcFunds } from 'engine/upgrade';
import upgrades from 'engine/upgrades';
import { ChargeUpgradeStatus } from 'consts';
import { addUpgrade, selectUpgrade, setUpgrade } from 'state/slices/improvementsSlice';
import { spend } from 'state/slices/inventorySlice';
import ProgressBarUpgrade from './ProgressBarUpgrade';


function ControllerUpgrade({ levelId, ownerId, upgradeId }) {
    const dispatch = useDispatch();

    const unlocked = useUpgradeCheckUnlock(levelId, ownerId, upgradeId);

    const upgrade = useSelector(state => selectUpgrade(state, levelId, ownerId, upgradeId));
    const level = useSelector(state => upgrades[upgradeId].selectLevel(state, levelId, ownerId));

    if (!unlocked)
        return null;

    const capacity = useMemo(() => {
        const { capacity } = calcCost({ costDef: upgrade.capacityDef, level });
        return capacity;
    }, [upgrade.capacityDef, level]);

    const handleClick = () => {
        const status = selectUpgrade(store.getState(), levelId, ownerId, upgradeId).info.status;
        if (status === ChargeUpgradeStatus.paused) {
            dispatch(setUpgrade({ levelId, ownerId, upgradeId, value: { info: { status: ChargeUpgradeStatus.charging } } }));
            return;
        }
        if (status === ChargeUpgradeStatus.charging) {
            dispatch(setUpgrade({ levelId, ownerId, upgradeId, value: { info: { status: ChargeUpgradeStatus.paused } } }));
            return;
        }

        const upgradeState = store.getState().upgrades[ownerId][upgradeId];
        const cost = calcCost(upgradeState);
        const hasFunds = calcFunds(store.getState(), cost);

        if (!hasFunds)
            return;

        store.dispatch(spend(cost));
        dispatch(setUpgrade({ levelId, ownerId, upgradeId, value: { info: { status: ChargeUpgradeStatus.charging } } }));
    }

    useTick(3, useCallback(() => {
        const state = store.getState();
        const upgrade = selectUpgrade(state, levelId, ownerId, upgradeId);

        if (upgrade.charge >= capacity) {
            dispatch(setUpgrade({
                levelId, ownerId, upgradeId, value: {
                    info: {
                        status: ChargeUpgradeStatus.pending
                    },
                    charge: upgrade.charge - capacity
                }
            }));
            upgrades[upgradeId].buyEffect();

            return;
        }

        if (upgrade.info.status !== ChargeUpgradeStatus.charging)
            return;

        if (!upgrades[upgradeId].tickSpend(levelId, ownerId))
            return;

        dispatch(addUpgrade({ levelId, ownerId, upgradeId, value: { charge: 1 } }));
    }, [levelId, ownerId, upgradeId, capacity, dispatch]));

    return <ProgressBarUpgrade id={upgradeId} onClick={handleClick} progress={upgrade.charge / capacity} />
}

export default ControllerUpgrade;
