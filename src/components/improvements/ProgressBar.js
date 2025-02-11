import React from 'react';
import { useTranslation } from 'react-i18next';

function ProgressBar({ upgradeId, progress, ...props }) {
    const { t } = useTranslation(null, { keyPrefix: `improvements.upgrades.${upgradeId}` });

    const percentage = Math.min(Math.floor(progress * 10000) / 100, 100);

    return (
        <div
            className="connection"
            {...props}
        >
            <div className="bar" style={{ width: `${percentage}%` }} />
            <div className="line">{t('title')}</div>
        </div >
    )
}

export default ProgressBar;
