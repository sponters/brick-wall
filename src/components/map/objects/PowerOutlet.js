import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { createPowerOutlet } from "engine/eletronics";
import useInitLevelObjState from "hooks/useInitLevelObjState";
import { ObjectTypes } from 'consts';
import { LevelContext } from '../Level';
import { connect, disconnect, selectConnected } from 'state/slices/improvementsSlice';
import WallObject from '../WallObject';

function PowerOutlet({ objId, batteryId, port, ...props}) {
    const { levelId } = useContext(LevelContext);

    // Create state if not in the store (initialization)
    const hasState = useInitLevelObjState(levelId, objId, () => createPowerOutlet(levelId, objId, batteryId));

    const dispatch = useDispatch();

    useEffect(() => () => { dispatch(disconnect(objId)) }, [dispatch, objId]);

    const connected = useSelector(state => selectConnected(state, objId, port));

    const handleClick = () => {
        if (connected)
            dispatch(disconnect(objId));
        else
            dispatch(connect({ levelId, objId, port, type: ObjectTypes.power }));
    }

    if (!hasState)
        return null;

    return (
        <WallObject
            {...props}
            className="eletronic-metal-frame"
            onClick={handleClick}
        >
            <div className="battery-plug">{port}</div>
        </WallObject>
    )
}

export default PowerOutlet;
