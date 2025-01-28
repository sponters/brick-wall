import { useSelector } from "react-redux";
import ChargeUpgrade from "./ChargeUpgrade";

function Connections() {

    const port = useSelector(state => state.connection.port);
    const id = useSelector(state => state.connection.id);
    
    const chargeSelector = (state, id) => {
        if (!state.items[id].found)
            return false;
        return state.items[id].charge < state.items[id].maxCharge;
    }

    const flashlight = useSelector(state => chargeSelector(state, "flashlight"))

    return (
        <div id="upgrade-container">
            {flashlight && <ChargeUpgrade itemId="flashlight" batteryId="l1_b1" transfer={1} />}
        </div>
    )
}

export default Connections;
