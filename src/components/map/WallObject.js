import React from "react";

function WallObject({ row, col, height, width, style = {}, children, ...props }) {
    const placementStyle = {
        gridRow: `${row} / ${row + height}`,
        gridColumn: `${col} / ${col + width}`,
    }

    return (
        <div
            style={{
                ...style,
                ...placementStyle,
            }}
            {...props}
        >
            {children}
        </div>
    )
}

export default WallObject;
