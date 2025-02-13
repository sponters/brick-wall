import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { selectAllItems } from "state/slices/inventorySlice";
import { createSelector } from "@reduxjs/toolkit";
import ControllerUpgrade from "../upgrades/ControllerUpgrade";
import BatteryStatsUpgrade from "../upgrades/BatteryStatsUpgrade";
import { useSelector } from "react-redux";

function ControlBatteryPort({ levelId, objId, port }) {
    const { t } = useTranslation(null, { keyPrefix: 'improvements.containers.controlBattery' });

    const selectHasItem = useMemo(() => createSelector(
        [selectAllItems],
        (items) => Object.keys(items)
            .filter(itemId =>
                items[itemId].ports?.[port] &&
                items[itemId].found
            )
            .reduce((hasItem, itemId) => {
                return Math.max(hasItem, items[itemId].hasCharge ? 2 : 1)
            }, 0)
    ), [port]);

    const hasItem = useSelector(selectHasItem);

    if (hasItem === 0) {
        return (
            <div className="upgrades-container">
                <div className="header">{t('title')} {port}</div>
                <div>{t('noItem')}</div>
            </div>
        );
    }

    if (hasItem === 1) {
        return (
            <div className="upgrades-container">
                <div className="header">{t('title')} {port}</div>
                <div>{t('noCharge')}</div>
            </div>
        );
    }

    return (
        <div className="upgrades-container">
            <div className="header">{t('title')} {port}</div>
            <BatteryStatsUpgrade levelId={levelId} ownerId={objId} sections={["description", "cost", "time"]} />
            <ControllerUpgrade levelId={levelId} ownerId={objId} upgradeId="batteryChargeFaster" sections={["description", "effect", "cost", "time"]} />
        </div>
    )
}

export default ControlBatteryPort;
