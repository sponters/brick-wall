import React, { useRef } from 'react';
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';


import useUpgradeCheckUnlock from 'hooks/useImprovementCheckUnlock';
import useTooltipConfig from 'hooks/useTolltipConfig';
import useInitUpgradeState from 'hooks/useInitUpgradeState';
import { calcCost, selectHasFunds } from 'engine/upgrade'
import upgrades from 'engine/upgrades';
import store from 'state/store';
import { addUpgrade, selectUpgrade } from 'state/slices/improvementsSlice';
import { spend } from 'state/slices/inventorySlice';
import Tooltip from '../../Tooltip';

function InstantUpgradeComponent({ levelId, ownerId, upgradeId }) {
    const { t } = useTranslation(null, { keyPrefix: `improvements.upgrades.${upgradeId}` });
    const { t: tCommon } = useTranslation(null, { keyPrefix: `common` });

    const unlocked = useUpgradeCheckUnlock(levelId, ownerId, upgradeId);

    const upgrade = useSelector(state => selectUpgrade(state, levelId, ownerId, upgradeId));
    const cost = calcCost(upgrade);
    const hasFunds = useSelector(state => selectHasFunds(state, cost));

    const fundsBorder = hasFunds ? 'upgrade-buyable-border' : 'upgrade-no-funds-border';

    const upgradeRef = useRef();
    const tooltipRef = useRef();
    useTooltipConfig(upgradeRef, tooltipRef);

    if (!unlocked)
        return null;

    const handleClick = () => {
        const state = store.getState();
        const upgrade = selectUpgrade(state, levelId, ownerId, upgradeId);
        const cost = calcCost(upgrade);
        const hasFunds = selectHasFunds(state, cost);

        if (!hasFunds)
            return;

        store.dispatch(spend(cost));
        store.dispatch(addUpgrade({ levelId, ownerId, upgradeId, value: { level: 1 } }));
        upgrades[upgradeId].buyEffect()
    }

    return [
        <div
            key={upgradeId}
            className={`upgrade ${fundsBorder}`}
            onClick={handleClick}
            ref={upgradeRef}
        >
            <div className="line">{t('title')}</div>
            <div className="line">{tCommon('level')}: {upgrade.level}</div>
        </div>,
        <Tooltip
            key={`${upgradeId}_tooltip`}
            tInfo={t}
            tooltip={["description", "effect", "cost"]}
            values={{cost}}
            ref={tooltipRef}
        />
    ]
}

function InstantUpgrade({ levelId, ownerId, upgradeId }) {
    const hasState = useInitUpgradeState(levelId, ownerId, upgradeId, upgrades[upgradeId].initialState);

    if (!hasState)
        return null;

    return <InstantUpgradeComponent levelId={levelId} ownerId={ownerId} upgradeId={upgradeId} />;
}

export default InstantUpgrade;
