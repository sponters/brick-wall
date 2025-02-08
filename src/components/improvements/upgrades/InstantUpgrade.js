import React from 'react';

import { useSelector } from 'react-redux'

import { calcCost, selectHasFunds } from 'engine/upgrade'
import upgrades from 'engine/upgrades';
import { useTranslation } from 'react-i18next';
import useUpgradeCheckUnlock from 'hooks/useImprovementCheckUnlock';
import { useRef } from 'react';
import { addUpgrade, selectUpgrade } from 'state/slices/improvementsSlice';
import store from 'state/store';
import { spend } from 'state/slices/inventorySlice';
import useInitUpgradeState from 'hooks/useInitUpgradeState';

function InstantUpgradeComponent({ levelId, ownerId, upgradeId }) {
    const { t } = useTranslation(null, { keyPrefix: `improvements.upgrades.${upgradeId}` });
    const { t: tMeta } = useTranslation(null, { keyPrefix: `improvements.meta` });
    const { t: tRes } = useTranslation(null, { keyPrefix: `inventory.res` });

    const tooltip = useRef(null);

    const unlocked = useUpgradeCheckUnlock(levelId, ownerId, upgradeId);

    const upgrade = useSelector(state => selectUpgrade(state, levelId, ownerId, upgradeId));
    const cost = calcCost(upgrade);
    const hasFunds = useSelector(state => selectHasFunds(state, cost));

    const fundsBorder = hasFunds ? 'upgrade-buyable-border' : 'upgrade-no-funds-border';
    const formattedCost = Object.keys(cost).map(key => {
        const resName = tRes(`${key}.name`);
        const amount = cost[key];
        return `${resName}: ${amount}`;
    }).join(", ");

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

    const handleMouseEnter = () => {
        tooltip.current.style.visibility = "visible";
    }
    const handleMouseLeave = () => {
        tooltip.current.style.visibility = "hidden";
    }

    return (
        <div
            className={`upgrade ${fundsBorder}`}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="line">{t('title')}</div>
            <div className="line">{tMeta('level')}: {upgrade.level}</div>
            <div className="tooltip" ref={tooltip}>
                <div className="section">{tMeta('description')}</div>
                {t('description')}
                {t('effect') ? <div className="section separator">{tMeta('effect')}</div> : ""}
                {t('effect')}
                <div className="section separator">{tMeta('cost')}</div>
                {formattedCost}
            </div>
        </div>
    )
}

function InstantUpgrade({ levelId, ownerId, upgradeId }) {
    const hasState = useInitUpgradeState(levelId, ownerId, upgradeId, upgrades[upgradeId].initialState);

    if (!hasState)
        return null;

    return <InstantUpgradeComponent levelId={levelId} ownerId={ownerId} upgradeId={upgradeId} />;
}    

export default InstantUpgrade;
