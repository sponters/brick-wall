import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import ChargeUpgrade from "../upgrades/ChargeUpgrade";
import { createSelector } from "@reduxjs/toolkit";
import { useTranslation } from "react-i18next";
import { selectAllItems } from "state/slices/inventorySlice";
import { selectObj } from "state/slices/levelsSlice";


function ChargePort({ levelId, objId, port }) {
    const { t } = useTranslation(null, { keyPrefix: 'improvements.containers.powerOutlet' });

    const selectChargeableItems = useMemo(() => createSelector(
        [selectAllItems],
        (items) => Object.keys(items)
            .filter(itemId =>
                items[itemId].ports?.[port] &&
                items[itemId].found &&
                !items[itemId].charged
            )
            .map(itemId => [itemId, ...items[itemId].ports[port]])
    ), [port]);

    const upgrades = useSelector(selectChargeableItems);
    const batteryId = useSelector(state => selectObj(state, levelId, objId)).batteryId;
    const batteryHasCharge = useSelector(state => batteryId && selectObj(state, levelId, batteryId).charge > 0);

    if (batteryId === undefined)
        return null;

    if (!batteryHasCharge) {
        return (
            <div className="improvements-container">
                <div className="header">{t('title')}</div>
                <div>{t('noCharge')}</div>
            </div>
        );
    }

    if (upgrades.length === 0) {
        return (
            <div className="improvements-container">
                <div className="header">{t('title')}</div>
                <div>{t('nothing')}</div>
            </div>
        );
    }

    return (
        <div className="improvements-container">
            <div className="header">{t('title')}</div>
            {upgrades.map(u =>
                <ChargeUpgrade
                    key={u[3]}
                    upgradeId={u[3]}
                    itemId={u[0]}
                    levelId={levelId}
                    batteryId={batteryId}
                    dischargeValue={u[1]}
                    chargeValue={u[2]}
                />
            )}
        </div>
    )
}

export default ChargePort;
