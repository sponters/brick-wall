import { useSelector } from "react-redux";
import ChargePort from "./connections/ChargePort";
import ControllerInterface from "./connections/ControllerInterface";


function Connections() {
    const port = useSelector(state => state.connection.port);
    const id = useSelector(state => state.connection.id);
    const controller = useSelector(state => state.connection.controller);

    const connections = [];

    if (controller)
        connections.push(<ControllerInterface key="controller-interface" />);
    if (port === "●") 
        connections.push(<ChargePort key="charge-port" port={port} id={id} />);

    if (connections.length <= 0)
        return null;
    return connections;
}

export default Connections;
