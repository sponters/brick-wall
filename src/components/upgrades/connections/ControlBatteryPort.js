import React from "react";
import { useSelector } from "react-redux";
import ChargeUpgrade from "../upgrades/ChargeUpgrade";
import { createSelector } from "@reduxjs/toolkit";
import { useTranslation } from "react-i18next";

function ControlBatteryPort({ port, id }) {
    const { t: tMeta } = useTranslation(null, { keyPrefix: 'upgrades.meta.controlBattery' });

    const upgrades = useSelector(selectChargeItems);
    const batteryId = useSelector(state => state.eletronics[id]?.battery);
    const batteryHasCharge = useSelector(state => batteryId && state.eletronics[batteryId].charge > 0);

    if (batteryId === undefined)
        return null;

    if (!batteryHasCharge) {
        return (
            <div className="upgrades-container">
                <div className="header">{tMeta('title')} {port}</div>
                <div>{tMeta('noCharge')}</div>
            </div>
        );
    }

    if (upgrades.length === 0) {
        return (
            <div className="upgrades-container">
                <div className="header">{tMeta('title')} {port}</div>
                <div>{tMeta('nothingCharge')}</div>
            </div>
        );
    }

    return (
        <div className="upgrades-container">
            <div className="header">{tMeta('title')} {port}</div>
            {upgrades.map(u =>
                <ChargeUpgrade
                    key={u[3]}
                    upgradeId={u[3]}
                    itemId={u[0]}
                    batteryId={batteryId}
                    output={u[1]}
                    input={u[2]}
                />
            )}
        </div>
    )
}

export default ControlBatteryPort;
