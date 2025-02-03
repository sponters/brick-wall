import { createPowerOutlet } from "engine/eletronics";
import useInitState from "hooks/useInitState";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { connect, disconnect } from "state/slices/connectionSlice";

function PowerOutlet({ id, batteryId, port, amperage, row, col, height, width }) {
    // Create state if not in the store (initialization)
    const hasState = useInitState("eletronics", id, createPowerOutlet(batteryId));

    const dispatch = useDispatch();

    useEffect(() => () => { dispatch(disconnect(id)) }, [dispatch, id]);

    const [connected, setConnected] = useState(false);

    const handleClick = () => {
        if (connected) {
            dispatch(disconnect(id));
            setConnected(false);
        } else {
            dispatch(connect({ id, port, extra: amperage }));
            setConnected(true);
        }
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
