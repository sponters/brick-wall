import React, { useCallback, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';

import store from 'state/store'
import useTick from 'hooks/useTick';
import useUpgradeCheckUnlock from 'hooks/useImprovementCheckUnlock';
import useInitUpgradeState from 'hooks/useInitUpgradeState';
import useTooltipConfig from 'hooks/useTolltipConfig';
import { calcCost, selectHasFunds } from 'engine/upgrade';
import upgrades from 'engine/upgrades';
import { ChargeUpgradeStatus } from 'consts';
import { addUpgrade, selectUpgrade, setUpgrade } from 'state/slices/improvementsSlice';
import { spend } from 'state/slices/inventorySlice';
import ProgressBar from '../ProgressBar';
import Tooltip from '../../Tooltip';


function useCreateTickCallback(levelId, ownerId, upgradeId, capacity) {
    return useCallback(() => {
        const state = store.getState();
        const upgrade = selectUpgrade(state, levelId, ownerId, upgradeId);

        if (upgrade.charge >= capacity) {
            store.dispatch(setUpgrade({
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

        store.dispatch(addUpgrade({ levelId, ownerId, upgradeId, value: { charge: 1 } }));
    }, [levelId, ownerId, upgradeId, capacity]);
}

function createClickHandler(levelId, ownerId, upgradeId) {
    return () => {
        const upgrade = selectUpgrade(store.getState(), levelId, ownerId, upgradeId);
        const status = upgrade.info.status;
        if (status === ChargeUpgradeStatus.paused) {
            store.dispatch(setUpgrade({ levelId, ownerId, upgradeId, value: { info: { status: ChargeUpgradeStatus.charging } } }));
            return;
        }

        if (status === ChargeUpgradeStatus.charging) {
            store.dispatch(setUpgrade({ levelId, ownerId, upgradeId, value: { info: { status: ChargeUpgradeStatus.paused } } }));
            return;
        }

        const cost = calcCost(upgrade.info);
        const hasFunds = selectHasFunds(store.getState(), cost);

        if (!hasFunds)
            return;

        store.dispatch(spend(cost));
        store.dispatch(setUpgrade({ levelId, ownerId, upgradeId, value: { info: { status: ChargeUpgradeStatus.charging } } }));
    };
}

function ControllerUpgradeComponent({ levelId, ownerId, upgradeId, tooltip = [] }) {
    const { t } = useTranslation(null, { keyPrefix: `improvements.upgrades.${upgradeId}` });

    const unlocked = useUpgradeCheckUnlock(levelId, ownerId, upgradeId);

    const upgrade = useSelector(state => selectUpgrade(state, levelId, ownerId, upgradeId));
    const cost = calcCost(upgrade.info);
    const capacityLevel = useSelector(state => upgrades[upgradeId].selectCapacityLevel(state, levelId, ownerId));

    const capacity = useMemo(() => {
        const { capacity } = calcCost({ costDef: upgrade.info.capacityDef, level: capacityLevel });
        return capacity;
    }, [upgrade.info.capacityDef, capacityLevel]);

    useTick(3, useCreateTickCallback(levelId, ownerId, upgradeId, capacity));

    const barRef = useRef();
    const tooltipRef = useRef();
    useTooltipConfig(barRef, tooltipRef);

    if (!unlocked)
        return null;

    return [
        <ProgressBar
            key={upgradeId}
            upgradeId={upgradeId}
            onClick={createClickHandler(levelId, ownerId, upgradeId)}
            progress={upgrade.charge / capacity}
            ref={barRef}
        />,
        <Tooltip
            key={`${upgradeId}_tooltip`}
            tInfo={t}
            tooltip={tooltip}
            values={{cost}}
            ref={tooltipRef}
        />
    ];
}

function ControllerUpgrade({ levelId, ownerId, upgradeId, ...props }) {
    const hasState = useInitUpgradeState(levelId, ownerId, upgradeId, upgrades[upgradeId].initialState);

    if (!hasState)
        return null;

    return <ControllerUpgradeComponent levelId={levelId} ownerId={ownerId} upgradeId={upgradeId} {...props} />;
}

export default ControllerUpgrade;
