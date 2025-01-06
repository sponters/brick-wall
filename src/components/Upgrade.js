import { useSelector, shallowEqual  } from 'react-redux'

import { calcCost, calcFunds} from '../engine/upgrades/upgrade'
import upgrades from '../engine/upgrades';

function Upgrade({ id }) {
    const unlocked = useSelector(state => state.upgrades[id].unlocked);
    const level = useSelector(state => state.upgrades[id].level);
    const cost = useSelector(state => calcCost(state.upgrades[id], level), shallowEqual);
    const hasFunds = useSelector(state => calcFunds(state, cost));
    const fundsBorder = hasFunds ? 'upgrade-buyable' : 'upgrade-no-funds';

    const formattedCost = Object.keys(cost).map(key => `${key}: ${cost[key]}`).join(", ");

    if (!unlocked)
        return null;

    return (
        <div
            className={`upgrade ${fundsBorder}`}
            onClick={() => upgrades[id].buy()}
        >
            <div className="line">{upgrades[id].title}</div>
            <div className="line">Level: {level}</div>
            <div className="cost">Cost: {formattedCost}</div>
        </div>
    )
}

export default Upgrade;
