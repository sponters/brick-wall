import React, { useCallback } from 'react';
import { useSelector } from 'react-redux'

import upgrades from 'engine/upgrades';
import { selectUpgrade } from 'state/slices/improvementsSlice';
import useInitUpgradeState from 'hooks/useInitUpgradeState';
import ControllerUpgrade from './ControllerUpgrade';
import { selectObj } from 'state/slices/levelsSlice';
import useCalcRate from 'hooks/useCalcRate';


function BatteryStatsUpgradeComponent({ levelId, ownerId, upgradeId, ...props }) {
    const level = useSelector(state => selectUpgrade(state, levelId, ownerId, upgradeId).info.level);

    const capacity = useSelector(state => selectObj(state, levelId, ownerId).capacity);

    const speed = useCalcRate(useCallback(
        (state) => selectObj(state, levelId, ownerId).charge,
        [levelId, ownerId]
    ));

    if (level === 0)
        return <ControllerUpgrade levelId={levelId} ownerId={ownerId} upgradeId={upgradeId} {...props} />

    return (
        <div className="stats">
            <div>Capacity: {capacity}</div>
            <div>Speed: {speed === undefined ? "---" : `${speed}/s`}</div>
        </div>
    );
}

function BatteryStatsUpgrade({ levelId, ownerId, ...props }) {
    const upgradeId = "batteryStats";

    const hasState = useInitUpgradeState(levelId, ownerId, upgradeId, upgrades[upgradeId].initialState);

    if (!hasState)
        return null;

    return <BatteryStatsUpgradeComponent levelId={levelId} ownerId={ownerId} upgradeId={upgradeId} {...props} />;
}

export default BatteryStatsUpgrade;
