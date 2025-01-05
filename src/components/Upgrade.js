import { useSelector } from 'react-redux'

import upgrades from '../engine/upgrades'

function Upgrade({ upgradeId }) {
  const upgrade = upgrades[upgradeId];
  const unlocked = useSelector(state => state.upgrade[upgradeId].unlocked);
  const level = useSelector(state => state.upgrade[upgradeId].level);
  const cost = useSelector(state => {
    const up = state.upgrade[upgradeId];
    return Math.floor(up.baseCost * Math.pow(up.costFactor, up.level));
  });
  const hasFunds = useSelector(state => state.upgrade[upgradeId].cost <= state.res.bricks);
  const fundsBorder = hasFunds ? 'upgrade-buyable': 'upgrade-no-funds';

  const onclick = () => upgrades[upgradeId].buy();

  if (!unlocked)
    return false;

  return (
    <div 
      className={`upgrade ${fundsBorder}`}
      onClick={ hasFunds ? () => upgrades[upgradeId].buy() : false }
    >
      <div className="line">{upgrade.title}</div>
      <div className="line">Level: {level}</div>
      <div className="cost">Cost: {cost} bricks</div>
    </div>
  )
}

export default Upgrade;
