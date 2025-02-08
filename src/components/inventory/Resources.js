import React from 'react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux'
import { selectRes } from 'state/slices/inventorySlice';

function Resource({ resId }) {
    const { t } = useTranslation(null, { keyPrefix: `inventory.res.${resId}` });

    const tooltip = useRef(null);

    const cur = useSelector(state => selectRes(state, resId).cur);

    const handleMouseEnter = () => {
        tooltip.current.style.visibility = "visible";
    }
    const handleMouseLeave = () => {
        tooltip.current.style.visibility = "hidden";
    }

    return (
        <div
            className='resource'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {t('name')}: {cur}
            <div className='tooltip' ref={tooltip}>
                <div className="section">Description</div>
                {t('description')}

            </div>
        </div>
    )
}

function Resources() {
    const brick = useSelector(state => selectRes(state, "brick").unlocked);
    const hash = useSelector(state => selectRes(state, "hash").unlocked);

    const unlocked = brick || hash;

    if (!unlocked)
        return null;

    return (
        <div className="inventory-container">
            <div className="header">Resources</div>
            {brick && <Resource resId="brick" />}
            {hash && <Resource resId="hash" />}
        </div>
    );
}

export default Resources;
