import { shallowEqual, useSelector } from "react-redux";
import ChargeUpgrade from "./ChargeUpgrade";
import { createSelector } from "@reduxjs/toolkit";
import { useTranslation } from "react-i18next";

function ChargePort({ port, id }) {
    const { t: tMeta } = useTranslation(null, { keyPrefix: 'upgrades.meta.powerOutlet' });
    const selectChargeItems = createSelector(
        [state => state.items.ids],
        (ids) => Object.keys(ids)
            .filter(id =>
                ids[id].ports?.[port] &&
                ids[id].found &&
                !ids[id].charged
            )
            .map(id => [id, ...ids[id].ports[port]])
    );

    console.log("Rerender");

    const upgrades = useSelector(selectChargeItems);
    const batteryId = useSelector(state => state.eletronics[id]?.battery);
    const batteryHasCharge = useSelector(state => batteryId && state.eletronics[batteryId].charge >= 0);

    if (batteryId == undefined)
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
                <div>{tMeta('nothing')}</div>
            </div>
        );
    }

    return (
        <div className="upgrades-container">
            <div className="header">{tMeta('title')} {port}</div>
            {upgrades.map(u => <ChargeUpgrade key={u[0]} itemId={u[0]} batteryId={batteryId} output={u[1]} input={u[2]} />)}
        </div>
    )
}

function Connections() {
    const port = useSelector(state => state.connection.port);
    const id = useSelector(state => state.connection.id);

    if (port === "●") return <ChargePort port={port} id={id} />

    return null;
}

export default Connections;
