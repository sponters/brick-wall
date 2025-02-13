import React from 'react';

function ProgressBar({ title, progress, ...props }) {
    const percentage = Math.min(Math.floor(progress * 10000) / 100, 100);

    return (
        <div
            className="connection"
            {...props}
        >
            <div className="bar" style={{ width: `${percentage}%` }} />
            <div className="line">{title}</div>
        </div >
    )
}

export default ProgressBar;
