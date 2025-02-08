import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux'
import Controller from './items/Controller';
import Flashlight from './items/Flashlight';
import { useRef } from 'react';
import { selectItemInfo } from 'state/slices/inventorySlice';

function Items() {
    const { t } = useTranslation(null, { keyPrefix: `inventory.meta` });

    const containerRef = useRef(null);

    const controller = useSelector(state => selectItemInfo(state, "controller").found);
    const flashlight = useSelector(state => selectItemInfo(state, "flashlight").found);

    const unlocked = controller || flashlight;

    if (!unlocked)
        return null;

    return (
        <div className="inventory-container" ref={containerRef}>
            <div className="header">{t("collectables")}</div>
            <div className="collectables">
                {controller && <Controller containerRef={containerRef} />}
                {flashlight && <Flashlight containerRef={containerRef} />}
            </div>
        </div>
    );
}

export default Items;
