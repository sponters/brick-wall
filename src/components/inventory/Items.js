import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux'
import Controller from './items/Controller';
import Flashlight from './items/Flashlight';

function Items() {
    const { t } = useTranslation(null, { keyPrefix: `inventory.containers.collectables` });

    const unlocked = useSelector(state => state.inventory.items.tabUnlocked);

    if (!unlocked)
        return null;

    return (
        <div className="inventory-container">
            <div className="header">{t("title")}</div>
            <div className="collectables">
                <Controller />
                <Flashlight />
            </div>
        </div>
    );
}

export default Items;
