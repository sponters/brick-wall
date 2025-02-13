import React, { useCallback, useRef } from 'react';
import store from 'state/store'

import { useDispatch, useSelector } from 'react-redux'

import { useState } from 'react';
import ProgressBar from '../ProgressBar';
import useTick from 'hooks/useTick';
import { discharge, selectObj } from 'state/slices/levelsSlice';
import { recharge, selectItemTick } from 'state/slices/inventorySlice';
import { formatTicksToTime } from 'engine/time';
import Tooltip from 'components/Tooltip';
import useTooltipConfig from 'hooks/useTolltipConfig';
import { useTranslation } from 'react-i18next';

function ChargeUpgrade({ upgradeId, itemId, levelId, batteryId, dischargeValue, chargeValue }) {
    const { t } = useTranslation(null, { keyPrefix: `improvements.upgrades.${upgradeId}` });

    const dispatch = useDispatch();

    const [active, setActive] = useState(false);

    useTick(2, useCallback(() => {
        if (active) {
            const state = store.getState();
            const toFullCharge = selectItemTick(state, itemId).capacity - selectItemTick(state, itemId).charge;

            const transferDischarge = Math.min(
                dischargeValue,
                selectObj(state, levelId, batteryId).charge,
            );
            const transferCharge = Math.min(
                Math.round(chargeValue * transferDischarge / dischargeValue),
                toFullCharge,
            )

            if (transferDischarge > 0) {
                dispatch(discharge({ levelId, batteryId, charge: transferDischarge }));
                dispatch(recharge({ itemId, charge: transferCharge }));
            }

            if (transferCharge === toFullCharge)
                setActive(false);
        }
    }, [active, levelId, batteryId, itemId, dispatch, dischargeValue, chargeValue]));

    const tick = useSelector(state => selectItemTick(state, itemId));

    const time = formatTicksToTime((tick.capacity - tick.charge) / chargeValue);

    const barRef = useRef();
    const showTooltip = useTooltipConfig(barRef);

    return [
        <ProgressBar
            key="progress"
            title={t("title")}
            onClick={() => setActive(!active)}
            progress={tick.charge / tick.capacity}
            ref={barRef}
        />,
        showTooltip &&
        <Tooltip
            key="tooltip"
            sections={["time"]}
            extras={{ values: { time } }}
            ownerRef={barRef}
        />
    ];
}

export default ChargeUpgrade;
