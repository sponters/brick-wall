import { useSelector, shallowEqual } from 'react-redux'

import { calcCost, calcFunds} from 'engine/upgrade'
import upgrades from 'engine/upgrades';
import { useTranslation } from 'react-i18next';
import useUpgradeCheckUnlock from 'hooks/useUpgradeCheckUnlock';
import { useRef } from 'react';

function Upgrade({ id }) {
    const { t } = useTranslation(null, { keyPrefix: `upgrades.${id}`});
    const { t: tMeta } = useTranslation(null, { keyPrefix: `upgrades.meta`});
    const { t: tRes } = useTranslation(null, { keyPrefix: `items`});

    const tooltip = useRef(null);

    const unlocked = useUpgradeCheckUnlock(id);
    const level = useSelector(state => state.upgrades[id].level);
    const cost = useSelector(state => calcCost(state.upgrades[id], level), shallowEqual);
    const hasFunds = useSelector(state => calcFunds(state, cost));

    const fundsBorder = hasFunds ? 'upgrade-buyable-border' : 'upgrade-no-funds-border';
    const formattedCost = Object.keys(cost).map(key => {
        const resName = tRes(`${key}.name`);
        const amount = cost[key];
        return `${resName}: ${amount}`;
    }).join(", ");   

    if (!unlocked)
        return null;

    const handleMouseEnter = () => {
        tooltip.current.style.visibility = "visible";
    }
    const handleMouseLeave = () => {
        tooltip.current.style.visibility = "hidden";
    }

    return (
        <div
            className={`upgrade ${fundsBorder}`}
            onClick={() => upgrades[id].buy()}
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
