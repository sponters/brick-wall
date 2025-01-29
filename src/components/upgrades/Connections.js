import { shallowEqual, useSelector } from "react-redux";
import ChargeUpgrade from "./ChargeUpgrade";
import { createSelector } from "@reduxjs/toolkit";

function ChargePort({ port, id }) {
    const selectChargeItems = createSelector(
        [state => state.items],
        items => Object.keys(items)
            .filter(i =>
                items[i].ports?.[port] &&
                items[i].found &&
                items[i].charge < items[i].capacity
            )
            .map(i => [i, items[i].ports?.[port]])
    );

    const upgrades = useSelector(selectChargeItems, shallowEqual);
    const batteryId = useSelector(state => state.eletronics[id]?.battery);

    if (batteryId == undefined)
        return null;

    if (upgrades.length === 0) {
        return (
            <div className="upgrades-container">
                <div className="header">Power Outlet {port}</div>
                Nothing to charge
            </div>
        );
    }

    return (
        <div className="upgrades-container">
            <div className="header">Power Outlet {port}</div>
            {upgrades.map(u => <ChargeUpgrade key={u[0]} itemId={u[0]} batteryId={batteryId} transfer={u[1]} />)}
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
