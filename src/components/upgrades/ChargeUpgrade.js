import store from 'state/store'

import { useDispatch, useSelector } from 'react-redux'

import { useTranslation } from 'react-i18next';
import { useRef, useState } from 'react';
import { discharge } from 'state/slices/eletronicsSlice';
import { recharge } from 'state/slices/itemsSlice';
import useTick from 'hooks/useTick';

function ChargeUpgrade({ itemId, batteryId, output, input }) {
    const { t } = useTranslation(null, { keyPrefix: `upgrades.${itemId}.charge` });
    // const tooltip = useRef(null);
    const [charging, setCharging] = useState(false);
    const dispatch = useDispatch();

    useTick(2, () => {
        if (charging) {
            const state = store.getState();
            const transferCharge = Math.min(
                output,
                state.eletronics[batteryId].charge,
                state.items.charges[itemId].capacity - state.items.charges[itemId].charge
            );
            if (transferCharge > 0) {
                dispatch(discharge({ id: batteryId, charge: output }));
                dispatch(recharge({ id: itemId, charge: input }))
            }
        }
    }, [charging, dispatch]);

    const percentage = useSelector(state =>
        Math.floor(state.items.charges[itemId].charge * 100 / state.items.charges[itemId].capacity));

    // const handleMouseEnter = () => {
    //     tooltip.current.style.visibility = "visible";
    // }
    // const handleMouseLeave = () => {
    //     tooltip.current.style.visibility = "hidden";
    // }

    return (
        <div
            className="connection"
            onClick={() => { setCharging(!charging) }}
        // onMouseEnter={handleMouseEnter}
        // onMouseLeave={handleMouseLeave}
        >
            <div className="bar" style={{ width: `${percentage}%` }} />
            <div className="line">{t('title')}</div>
            {/* <div className="tooltip" ref={tooltip} style={{ width: "100%" }}>
                <div className="header">Description</div>
                {t('description')}
                {t('effect') ? <div className="header separator">Effect</div> : ""}
                {t('effect')}
                <div className="header separator">Cost</div>

            </div> */}
        </div>
    )
}

export default ChargeUpgrade;
