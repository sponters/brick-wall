import React from "react";
import { useSelector } from "react-redux";
import ChargePort from "./connections/ChargePort";
import ControllerInterface from "./connections/ControllerInterface";
import ControlBatteryPort from "./connections/ControlBatteryPort";
import { ObjectTypes } from "consts";
import { selectConnectionController, selectConnectionPort } from "state/slices/improvementsSlice";

const ConnectionComponents = {
    [ObjectTypes.power]: ChargePort,
    [ObjectTypes.battery]: ControlBatteryPort,
}

function Connections() {
    const { levelId, objId, port, type } = useSelector(selectConnectionPort);
    const controller = useSelector(selectConnectionController);

    const connections = [];

    if (controller)
        connections.push(
            <ControllerInterface key="controller-interface" />
        );
    if (type !== undefined) {
        const Component = ConnectionComponents[type];
        connections.push(
            <Component key="port-interface" levelId={levelId} objId={objId} port={port} />
        );
    }

    if (connections.length <= 0)
        return null;

    return connections;
}

export default Connections;
