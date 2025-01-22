import { useDispatch, useSelector } from "react-redux";
import useTick from "hooks/useTick";
import store from "state/store";
import { discharge, light } from "state/slices/eletronicsSlice";
import useInitState from "hooks/useInitState";
import { createLight } from "engine/eletronics";
import { useEffect } from "react";

function Light({ id, batteryId, level }) {
    // Create state if not in the store (initialization)
    const hasState = useInitState("eletronics", id, createLight(batteryId));
    
    const dispatch = useDispatch();

    useTick(1, () => {
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

    useEffect(() => {
        level.current.style.visibility = status ? 'visible' : 'hidden';
    }, [level, status]);

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
