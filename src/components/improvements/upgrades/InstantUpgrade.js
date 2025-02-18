import React, { useRef } from 'react';
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';


import useUpgradeCheckUnlock from 'hooks/useImprovementCheckUnlock';
import useTooltipConfig from 'hooks/useTolltipConfig';
import useInitUpgradeState from 'hooks/useInitUpgradeState';
import { calcCost, selectHasFunds } from 'engine/upgrade'
import upgrades from 'engine/upgrades';
import store from 'state/store';
import { selectUpgrade } from 'state/slices/improvementsSlice';
import { spend } from 'state/slices/inventorySlice';
import Tooltip from '../../Tooltip';

function InstantUpgradeComponent({ levelId, ownerId, upgradeId }) {
    const { t } = useTranslation(null, { keyPrefix: `improvements.upgrades.${upgradeId}` });
    const { t: tCommon } = useTranslation(null, { keyPrefix: `common` });

    const unlocked = useUpgradeCheckUnlock(levelId, ownerId, upgradeId);

    const upgrade = useSelector(state => selectUpgrade(state, levelId, ownerId, upgradeId));
    const cost = calcCost(upgrade.info);
    const hasFunds = useSelector(state => selectHasFunds(state, cost));

    const fundsBorder = hasFunds ? 'improvement-buyable-border' : 'improvement-no-funds-border';

    const upgradeRef = useRef();
    const showTooltip = useTooltipConfig(upgradeRef);

    const level = (upgrade.info.level === undefined) ? -1 : upgrade.info.level;
    const maxLevel = upgrade.info.maxLevel ? upgrade.info.maxLevel : Number.MAX_SAFE_INTEGER;

    if (!unlocked || (level >= maxLevel))
        return null;

    const handleClick = () => {
        const state = store.getState();
        const upgrade = selectUpgrade(state, levelId, ownerId, upgradeId);
        const cost = calcCost(upgrade.info);
        const hasFunds = selectHasFunds(state, cost);

        if (!hasFunds)
            return;

        store.dispatch(spend(cost));
        upgrades[upgradeId].buyEffect(levelId, ownerId, upgradeId);
    }

    return [
        <div
            key={upgradeId}
            className={`upgrade ${fundsBorder}`}
            onClick={handleClick}
            ref={upgradeRef}
        >
            <div className="line">{t('title')}</div>
            {(maxLevel > 1 && level >= 0) &&
                <div className="line">{tCommon('level')}:&nbsp;
                    {(maxLevel === Number.MAX_SAFE_INTEGER) ? upgrade.info.level : `(${level} / ${maxLevel})`}
                </div>
            }
        </div>,
        showTooltip &&
        <Tooltip
            key={`${upgradeId}_tooltip`}
            tInfo={t}
            sections={["description", "effect", "cost"]}
            extras={{ values: { cost } }}
            ownerRef={upgradeRef}
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
