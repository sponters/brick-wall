import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux'
import Controller from './items/Controller';
import Flashlight from './items/Flashlight';
import Hammer from './items/Hammer';

function Items() {
    const { t } = useTranslation(null, { keyPrefix: `inventory.containers.collectables` });

    const unlocked = useSelector(state => state.inventory.items.tabUnlocked);

    if (!unlocked)
        return null;

    return (
        <div className="inventory-container">
            <div className="header">{t("title")}</div>
            <div className="collectables">
                <Hammer />
                <Controller />
                <Flashlight />
            </div>
        </div>
    );
}

export default Items;
