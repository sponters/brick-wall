import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';

function TimeUpgrade({ id, tooltip=false, onClick, percentage }) {
    const { t } = useTranslation(null, { keyPrefix: `upgrades.${id}` });
    const tooltipRef = useRef(null);

    const handleMouseEnter = () => {
        if (tooltip)
            tooltipRef.current.style.visibility = "visible";
    }
    const handleMouseLeave = () => {
        if (tooltip)
            tooltipRef.current.style.visibility = "hidden";
    }

    return (
        <div
            className="connection"
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="bar" style={{ width: `${percentage}%` }} />
            <div className="line">{t('title')}</div>
            {tooltip &&
                < div className="tooltipRef" ref={tooltipRef} style={{ width: "100%" }}>
                    <div className="header">Description</div>
                    {t('description')}
                    {t('effect') ? <div className="header separator">Effect</div> : ""}
                    {t('effect')}
                    <div className="header separator">Cost</div>
                </div>
            }
        </div >
    )
}

export default TimeUpgrade;
