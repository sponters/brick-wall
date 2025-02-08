import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import store from 'state/store'

import useTick from 'hooks/useTick';
import useUpgradeCheckUnlock from 'hooks/useImprovementCheckUnlock';
import { calcCost, selectHasFunds } from 'engine/upgrade';
import upgrades from 'engine/upgrades';
import { ChargeUpgradeStatus } from 'consts';
import { addUpgrade, selectUpgrade, setUpgrade } from 'state/slices/improvementsSlice';
import { spend } from 'state/slices/inventorySlice';
import ProgressBar from '../ProgressBar';
import useInitUpgradeState from 'hooks/useInitUpgradeState';


function ControllerUpgradeComponent({ levelId, ownerId, upgradeId }) {
    const dispatch = useDispatch();

    const unlocked = useUpgradeCheckUnlock(levelId, ownerId, upgradeId);

    const upgrade = useSelector(state => selectUpgrade(state, levelId, ownerId, upgradeId));
    const capacityLevel = useSelector(state => upgrades[upgradeId].selectCapacityLevel(state, levelId, ownerId));

    const capacity = useMemo(() => {
        const { capacity } = calcCost({ costDef: upgrade.info.capacityDef, level: capacityLevel });
        return capacity;
    }, [upgrade.info.capacityDef, capacityLevel]);
    
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
            upgrades[upgradeId].buyEffect(levelId, ownerId);
            
            return;
        }
        
        if (upgrade.info.status !== ChargeUpgradeStatus.charging)
            return;
        
        if (!upgrades[upgradeId].tickSpend(levelId, ownerId))
            return;
        
        dispatch(addUpgrade({ levelId, ownerId, upgradeId, value: { charge: 1 } }));
    }, [levelId, ownerId, upgradeId, capacity, dispatch]));
    
    if (!unlocked)
        return null;

    const handleClick = () => {
        const upgrade = selectUpgrade(store.getState(), levelId, ownerId, upgradeId); 
        const status = upgrade.info.status;
        if (status === ChargeUpgradeStatus.paused) {
            dispatch(setUpgrade({ levelId, ownerId, upgradeId, value: { info: { status: ChargeUpgradeStatus.charging } } }));
            return;
        }
        if (status === ChargeUpgradeStatus.charging) {
            dispatch(setUpgrade({ levelId, ownerId, upgradeId, value: { info: { status: ChargeUpgradeStatus.paused } } }));
            return;
        }
        
        const cost = calcCost(upgrade.info);
        const hasFunds = selectHasFunds(store.getState(), cost);
        
        if (!hasFunds)
            return;
        
        store.dispatch(spend(cost));
        dispatch(setUpgrade({ levelId, ownerId, upgradeId, value: { info: { status: ChargeUpgradeStatus.charging } } }));
    }
    
    return <ProgressBar upgradeId={upgradeId} onClick={handleClick} progress={upgrade.charge / capacity} />
}    

function ControllerUpgrade({ levelId, ownerId, upgradeId }) {
    const hasState = useInitUpgradeState(levelId, ownerId, upgradeId, upgrades[upgradeId].initialState);

    if (!hasState)
        return null;

    return <ControllerUpgradeComponent levelId={levelId} ownerId={ownerId} upgradeId={upgradeId} />;
}    

export default ControllerUpgrade;
