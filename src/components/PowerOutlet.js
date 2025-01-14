import { createPowerOutlet } from "../engine/eletronics";
import useInitState from "../hooks/useInitState";

function PowerOutlet({ id, batteryId, row, col, height, width }) {
    // Create state if not in the store (initialization)
    const hasState = useInitState("eletronics", id, createPowerOutlet(batteryId));

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
        >
            <div className="battery-plug">●</div>
        </div>
    )
}

export default PowerOutlet;
