import { BorderTypes } from 'consts';
import React from 'react';

function ProgressBar({ borderType = BorderTypes.normal, title, progress, ...props }) {
    const percentage = Math.min(Math.floor(progress * 10000) / 100, 100);

    const borderCss = (
        (borderType === BorderTypes.normal) ?
            "improvement-normal-border" :
            (borderType === BorderTypes.hasFunds) ?
                "improvement-buyable-border" :
                "improvement-no-funds-border"
    );

    return (
        <div
            className={`connection ${borderCss}`}
            {...props}
        >
            <div className="bar" style={{ width: `${percentage}%` }} />
            <div className="line">{title}</div>
        </div >
    )
}

export default ProgressBar;
