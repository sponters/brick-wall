import React from 'react';

import { useSelector, shallowEqual } from 'react-redux'

import { calcCost, calcFunds } from 'engine/upgrade'
import upgrades from 'engine/upgrades';
import { useTranslation } from 'react-i18next';
import useUpgradeCheckUnlock from 'hooks/useImprovementCheckUnlock';
import { useRef } from 'react';
import { addUpgrade, selectUpgrade } from 'state/slices/improvementsSlice';
import store from 'state/store';
import { spend } from 'state/slices/inventorySlice';

function Upgrade({ ownerId, upgradeId }) {
    const { t } = useTranslation(null, { keyPrefix: `upgrades.${upgradeId}` });
    const { t: tMeta } = useTranslation(null, { keyPrefix: `upgrades.meta` });
    const { t: tRes } = useTranslation(null, { keyPrefix: `items` });

    const tooltip = useRef(null);

    const unlocked = useUpgradeCheckUnlock(upgradeId);
    const level = useSelector(state => state.upgrades[upgradeId].level);
    const cost = useSelector(state => calcCost(state.upgrades[upgradeId], level), shallowEqual);
    const hasFunds = useSelector(state => calcFunds(state, cost));

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
        const upgradeState = selectUpgrade(state, ownerId, upgradeId);
        const cost = calcCost(upgradeState);
        const hasFunds = calcFunds(state, cost);

        if (!hasFunds)
            return;

        store.dispatch(spend(cost));
        store.dispatch(addUpgrade({ ownerId, upgradeId, value: { level: 1 } }));
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
            <div className="line">{tMeta('level')}: {level}</div>
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

export default Upgrade;
