import React from "react";
import { useSelector } from "react-redux";
import ChargePort from "./connections/ChargePort";
import ControllerInterface from "./connections/ControllerInterface";
import ControlBatteryPort from "./connections/ControlBatteryPort";
import { EletronicTypes } from "consts";

const ConnectionComponents = {
    [EletronicTypes.power]: ChargePort,
    [EletronicTypes.battery]: ControlBatteryPort,
}

function Connections() {
    const { port, id, type } = useSelector(state => state.connection.port);
    const controller = useSelector(state => state.connection.controller);

    const connections = [];

    if (controller)
        connections.push(<ControllerInterface key="controller-interface" />);
    if (type !== undefined) {
        const Component = ConnectionComponents[type];
        connections.push(<Component key="port-interface" port={port} id={id} />);
    }

    if (connections.length <= 0)
        return null;
    return connections;
}

export default Connections;
