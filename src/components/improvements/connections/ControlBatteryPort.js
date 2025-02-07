import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { selectAllItems } from "state/slices/inventorySlice";
import { createSelector } from "@reduxjs/toolkit";
import ControllerUpgrade from "../upgrades/ControllerUpgrade";

function ControlBatteryPort({ levelId, objId, port }) {
    const { t: tMeta } = useTranslation(null, { keyPrefix: 'improvements.meta.controlBattery' });

    const hasItem = useMemo(() => createSelector(
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

    if (hasItem === 0) {
        return (
            <div className="upgrades-container">
                <div className="header">{tMeta('title')} {port}</div>
                <div>{tMeta('noItem')}</div>
            </div>
        );
    }

    if (hasItem === 1) {
        return (
            <div className="upgrades-container">
                <div className="header">{tMeta('title')} {port}</div>
                <div>{tMeta('noCharge')}</div>
            </div>
        );
    }

    return (
        <div className="upgrades-container">
            <div className="header">{tMeta('title')} {port}</div>
            <ControllerUpgrade levelId={levelId} ownerId={objId} upgradeId="batteryChargeFaster" />
        </div>
    )
}

export default ControlBatteryPort;
