import React from 'react';
import { createPowerOutlet } from "engine/eletronics";
import useInitState from "hooks/useInitState";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect, disconnect } from "state/slices/connectionSlice";
import { EletronicTypes } from 'consts';

function PowerOutlet({ id, batteryId, port, row, col, height, width }) {
    // Create state if not in the store (initialization)
    const hasState = useInitState("eletronics", id, () => createPowerOutlet(id, batteryId));

    const dispatch = useDispatch();

    useEffect(() => () => { dispatch(disconnect(id)) }, [dispatch, id]);

    const connected = useSelector(state => state.connection.id === id && state.connection.port === port);

    const handleClick = () => {
        if (connected)
            dispatch(disconnect(id));
        else
            dispatch(connect({ id, port, type: EletronicTypes.power }));
    }

    if (!hasState)
        return null;

    const placementStyle = {
        gridRow: `${row} / ${row + height}`,
        gridColumn: `${col} / ${col + width}`,
    }

    return (
        <div
            className="eletronic-metal-frame"
            style={placementStyle}
            onClick={handleClick}
        >
            <div className="battery-plug">{port}</div>
        </div>
    )
}

export default PowerOutlet;
