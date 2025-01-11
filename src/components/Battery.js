import { useState } from "react";
import { recharge } from "../redux/slices/eletronicsSlice";
import { useDispatch, useSelector } from "react-redux";
import useTick from "../hooks/useTick";

function Battery({ id, row, col, height, width }) {
    const [charging, setCharging] = useState(false);
    const dispatch = useDispatch();

    const handleMouseDown = () => {
        setCharging(true);
    }
    const handleMouseOff = () => {
        setCharging(false);
    }

    useTick(() => {
        if (charging)
            dispatch(recharge({ id, charge: 2 }));
    }, [charging, dispatch]);

    const charge = useSelector(state => state.eletronics.batteries[id].charge);
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
    }

    return (
        <div
            className="battery-frame"
            style={placementStyle}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseOff}
            onMouseUp={handleMouseOff}
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
