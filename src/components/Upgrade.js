import { useSelector, shallowEqual  } from 'react-redux'

import { calcCost, calcFunds} from '../engine/upgrades/upgrade'
import upgrades from '../engine/upgrades';
import { useRef } from 'react';

function Upgrade({ id }) {
    const tooltip = useRef(null);

    const upgrade = upgrades[id];

    const unlocked = useSelector(state => state.upgrades[id].unlocked);
    const level = useSelector(state => state.upgrades[id].level);
    const cost = useSelector(state => calcCost(state.upgrades[id], level), shallowEqual);
    const hasFunds = useSelector(state => calcFunds(state, cost));
    const fundsBorder = hasFunds ? 'upgrade-buyable-border' : 'upgrade-no-funds-border';

    const formattedCost = Object.keys(cost).map(key => `${key}: ${cost[key]}`).join(", ");

    const handleMouseEnter = () => {
        tooltip.current.style.visibility = "visible";
    }
    const handleMouseLeave = () => {
        tooltip.current.style.visibility = "hidden";
    }

    if (!unlocked)
        return null;

    return (
        <div
            className={`upgrade ${fundsBorder}`}
            onClick={() => upgrade.buy()}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="line">{upgrade.title}</div>
            <div className="line">Level: {level}</div>
            <div className="tooltip" ref={tooltip}>
                {upgrade.flavor}
            </div>
        </div>
    )
}

export default Upgrade;
