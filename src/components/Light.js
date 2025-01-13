import { useDispatch, useSelector } from "react-redux";
import useTick from "../hooks/useTick";
import store from "../redux/store";
import { discharge, light } from "../redux/slices/eletronicsSlice";
import useInitState from "../hooks/useInitState";
import { createLight } from "../engine/eletronics";

function Light({ id, batteryId }) {
    // Create state if not in the store (initialization)
    const hasState = useInitState("eletronics", id, createLight(batteryId));
    
    const dispatch = useDispatch();

    useTick(() => {
        if (!hasState)
            return;

        const eletronics = store.getState().eletronics;
        const lightState = eletronics[id];

        if (eletronics[lightState.battery].charge > 0) {
            dispatch(discharge({ id: lightState.battery, charge: 1 }))
            dispatch(light({ id, status: true }))
        } else {
            dispatch(light({ id, status: false }))
        }
    }, [id, hasState, dispatch]);

    const status = useSelector(state => state.eletronics[id]?.status);
    const heat = useSelector(state => state.eletronics[id]?.heat);
    const reached100Heat = useSelector(state => state.eletronics[id]?.reached100Heat);

    if (!hasState)
        return null;

    const opacity = heat > 100 ? 0 : (1 - heat / 100);

    return (
        <div
            className="light"
            style={{
                position: reached100Heat ? "relative" : "fixed",
                opacity,
                display: opacity === 0 && !status ? "none" : "inline"
            }}
        />
    )
}

export default Light;
