import Tooltip from 'components/Tooltip';
import useTooltipConfig from 'hooks/useTolltipConfig';
import React from 'react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux'
import { selectRes } from 'state/slices/inventorySlice';

function Resource({ resId }) {
    const { t } = useTranslation(null, { keyPrefix: `inventory.res.${resId}` });

    const res = useSelector(state => selectRes(state, resId));

    const resRef = useRef();
    const tooltipRef = useRef();
    useTooltipConfig(resRef, tooltipRef);

    if (!res.unlocked)
        return null;

    return [
        <div
            key={resId}
            className='resource'
            ref={resRef}
        >
            {t('name')}: {res.cur}
        </div>,
        <Tooltip
            key={`${resId}_tooltip`}
            tInfo={t}
            tooltip={["description"]}
            ref={tooltipRef}
        />
    ];
}

function Resources() {
    const { t } = useTranslation(null, { keyPrefix: "inventory.containers.resources" });

    const unlocked = useSelector(state => state.inventory.res.tabUnlocked);

    if (!unlocked)
        return null;

    return (
        <div className="inventory-container">
            <div className="header">{t("title")}</div>
            <Resource resId="brick" />
            <Resource resId="hash" />
        </div>
    );
}

export default Resources;
