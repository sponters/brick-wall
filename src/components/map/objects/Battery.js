import React from "react";
import { useCallback, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import useTick from "hooks/useTick";
import useInitLevelObjState from "hooks/useInitLevelObjState";
import { ObjectTypes } from "consts";
import { createBattery } from "engine/eletronics";

import { LevelContext } from '../Level';
import WallObject from "../WallObject";
import { recharge, selectObj } from "state/slices/levelsSlice";
import { connect, disconnect, selectConnected } from "state/slices/improvementsSlice";

function Battery({ objId, front = false, back = false, ...props }) {
    const { levelId, front: levelFront } = useContext(LevelContext);

    // Create state if not in the store (initialization)
    const hasState = useInitLevelObjState(levelId, objId, () => createBattery(levelId, objId));

    const [charging, setCharging] = useState(false);
    const dispatch = useDispatch();

    useTick(0, useCallback(() => {
        if (charging) {
            dispatch(recharge({ levelId, batteryId: objId }));
        }
    }, [charging, dispatch, levelId, objId]));

    const charge = useSelector(state => selectObj(state, levelId, objId)?.charge);
    const connected = useSelector(state => selectConnected(state, objId, "◘"));

    if (!hasState)
        return null;

    const displayCharge = charge >= 9999 ? 9999 : charge;
    const formattedCharge = `0000${displayCharge}`.slice(-4);

    const ledColor = (
        charging ? '#f0df4f' :
            (charge <= 0) ? '#e00' :
                '#5bbe2a');

    const ledStyle = {
        color: ledColor,
        textShadow: `0 0 4px ${ledColor}`
    };

    if ((front && levelFront) || (back && !levelFront))
        ledStyle.zIndex = 11;

    const handleChargeOn = () => { setCharging(true); }
    const handleChargeOff = () => { setCharging(false); }

    const handlePortClick = () => {
        if (connected)
            dispatch(disconnect(objId));
        else
            dispatch(connect({ levelId, objId, port: "◘", type: ObjectTypes.battery }));
    }

    return (
        <WallObject
            {...props}
            className="eletronic-metal-frame"
            onMouseDown={handleChargeOn}
            onMouseLeave={handleChargeOff}
            onMouseUp={handleChargeOff}
        >
            <div className="battery-led" style={ledStyle}>●</div>
            <div className="battery-screen">
                {formattedCharge}
            </div>
            <div className="battery-plug" onClick={handlePortClick}>◘</div>
        </WallObject>
    )
}

export default Battery;
