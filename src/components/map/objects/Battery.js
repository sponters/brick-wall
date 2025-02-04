import React from "react";
import { useCallback, useState } from "react";
import { recharge } from "state/slices/eletronicsSlice";
import { useDispatch, useSelector } from "react-redux";
import useTick from "hooks/useTick";
import { createBattery } from "engine/eletronics";
import useInitState from "hooks/useInitState";

import { LevelContext } from '../Level';
import { useContext } from 'react';

function Battery({ id, row, col, height, width, global=false }) {
    // Create state if not in the store (initialization)
    const hasState = useInitState("eletronics", id, createBattery());

    const front = useContext(LevelContext);

    const [charging, setCharging] = useState(false);
    const dispatch = useDispatch();

    useTick(0, useCallback(() => {
        if (charging) {
            dispatch(recharge(id));
        }
    }, [charging, dispatch, id]));

    const charge = useSelector(state => state.eletronics[id]?.charge);

    if (!hasState)
        return null;

    const displayCharge = charge >= 9999 ? 9999 : charge;
    const formattedCharge = `0000${displayCharge}`.slice(-4);

    const placementStyle = {
        gridRow: `${row} / ${row + height}`,
        gridColumn: `${col} / ${col + width}`,
    }

    const ledColor = (
        charging ? '#f0df4f' :
            (charge <= 0) ? '#e00' :
                '#5bbe2a');

    const ledStyle = {
        color: ledColor,
        textShadow: `0 0 4px ${ledColor}`
    };
    if (global && front)
        ledStyle.zIndex = 11;

    const handleChargeOn = () => { setCharging(true); }
    const handleChargeOff = () => { setCharging(false); }

    return (
        <div
            className="eletronic-metal-frame"
            style={placementStyle}
            onMouseDown={handleChargeOn}
            onMouseLeave={handleChargeOff}
            onMouseUp={handleChargeOff}
        >
            <div className="battery-led" style={ledStyle}>●</div>
            <div className="battery-screen">
                {formattedCharge}
            </div>
            <div className="battery-plug">◘</div>
        </div>
    )
}

export default Battery;
