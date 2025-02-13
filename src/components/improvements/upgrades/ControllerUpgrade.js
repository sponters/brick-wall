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
import { formatTicksToTime } from 'engine/time';

function tryPurchase(levelId, ownerId, upgradeId, upgrade) {
    const cost = calcCost(upgrade.info);
    const hasFunds = selectHasFunds(store.getState(), cost);

    if (!hasFunds)
        return;

    store.dispatch(spend(cost));
    store.dispatch(setUpgrade({ levelId, ownerId, upgradeId, value: { info: { status: ChargeUpgradeStatus.charging } } }));
}

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
            upgrades[upgradeId].buyEffect(levelId, ownerId, upgradeId);

            return;
        }

        if (upgrade.info.status === ChargeUpgradeStatus.paused)
            return;

        if (upgrade.info.status === ChargeUpgradeStatus.pending) {
            if (upgrade.info.auto)
                tryPurchase(levelId, ownerId, upgradeId, upgrade);
            return;
        }

        if (!upgrades[upgradeId].tickSpend(levelId, ownerId, upgradeId))
            return;

        store.dispatch(addUpgrade({ levelId, ownerId, upgradeId, value: { charge: upgrade.info.chargeSpeed } }));
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

        tryPurchase(levelId, ownerId, upgradeId, upgrade);
    };
}

function ControllerUpgradeComponent({ levelId, ownerId, upgradeId, sections = [] }) {
    const { t } = useTranslation(null, { keyPrefix: `improvements.upgrades.${upgradeId}` });

    const unlocked = useUpgradeCheckUnlock(levelId, ownerId, upgradeId);

    const upgrade = useSelector(state => selectUpgrade(state, levelId, ownerId, upgradeId));
    const cost = calcCost(upgrade.info);
    const capacityLevel = useSelector(state => upgrades[upgradeId].selectCapacityLevel(state, levelId, ownerId, upgradeId));

    const capacity = useMemo(() => {
        const { capacity } = calcCost({ costDef: upgrade.info.capacityDef, level: capacityLevel });
        return capacity;
    }, [upgrade.info.capacityDef, capacityLevel]);

    useTick(3, useCreateTickCallback(levelId, ownerId, upgradeId, capacity));

    const barRef = useRef();
    const showTooltip = useTooltipConfig(barRef);

    const time = formatTicksToTime((capacity - upgrade.charge) / upgrade.info.chargeSpeed);

    const isMaxLevel = upgrade.info.maxLevel && ((upgrade.info.level || 0) >= upgrade.info.maxLevel);

    if (!unlocked || isMaxLevel)
        return null;

    const title = t("title") + (upgrade.info.level ? ` (${upgrade.info.level})` : "");

    const components = [
        <ProgressBar
            key={upgradeId}
            title={title}
            onClick={createClickHandler(levelId, ownerId, upgradeId)}
            progress={upgrade.charge / capacity}
            ref={barRef}
        />
    ];

    if (showTooltip) {
        components.push(
            <Tooltip
                key={`${upgradeId}_tooltip`}
                tInfo={t}
                sections={sections}
                extras={{ values: { cost, time } }}
                ownerRef={barRef}
            />
        )
    }

    return components;
}

function ControllerUpgrade({ levelId, ownerId, upgradeId, ...props }) {
    const hasState = useInitUpgradeState(levelId, ownerId, upgradeId, upgrades[upgradeId].initialState);

    if (!hasState)
        return null;

    return <ControllerUpgradeComponent levelId={levelId} ownerId={ownerId} upgradeId={upgradeId} {...props} />;
}

export default ControllerUpgrade;
