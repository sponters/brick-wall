import React from "react";
import { useSelector } from "react-redux";
import ChargePort from "./connections/ChargePort";
import ScorePort from "./connections/ScorePort";
import ControllerInterface from "./connections/ControllerInterface";
import ControlBatteryPort from "./connections/ControlBatteryPort";
import { ConnectionTypes as ConnectionTypes } from "consts";
import { selectConnectionController, selectConnectionPort } from "state/slices/improvementsSlice";
import ControlController from "./connections/ControlController";

const ConnectionComponents = {
    [ConnectionTypes.power]: ChargePort,
    [ConnectionTypes.battery]: ControlBatteryPort,
    [ConnectionTypes.score]: ScorePort,
    [ConnectionTypes.controller]: ControlController,
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
