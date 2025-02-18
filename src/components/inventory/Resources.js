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

    const formattedMax = res.max < Number.MAX_SAFE_INTEGER ? ` / ${res.max}` : "";

    const resRef = useRef();
    const showTooltip = useTooltipConfig(resRef);

    if (!res.unlocked)
        return null;

    return [
        <div
            key={resId}
            className='resource'
            ref={resRef}
        >
            {t('name')}: {res.cur}{formattedMax}
        </div>,
        showTooltip &&
        <Tooltip
            key={`${resId}_tooltip`}
            tInfo={t}
            sections={["description"]}
            ownerRef={resRef}
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
            <Resource resId="rainbow" />
        </div>
    );
}

export default Resources;
