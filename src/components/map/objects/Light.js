import { useDispatch, useSelector } from "react-redux";
import useTick from "hooks/useTick";
import store from "state/store";
import { discharge, light } from "state/slices/eletronicsSlice";
import useInitState from "hooks/useInitState";
import { createLight } from "engine/eletronics";
import { useEffect, useRef } from "react";
import { useMouseFollow } from "engine/mouse";

function LightFromFlashlight() {
    const ref = useRef();

    console.log("Flash!");
    useMouseFollow("center", (x, y, inside) => {
        if (inside) {
            ref.current.style.left = `calc(50% + ${x}px)`;
            ref.current.style.top = `calc(50% + ${y}px)`;
        } else {
            ref.current.style.left = `calc(150%)`;
            ref.current.style.top = `calc(150%)`;
        }
    });

    return (
        <div
            ref={ref}
            className="light-common light-flashlight"
        />
    )
}

function Light({ id, batteryId, level, global = false }) {
    // Create state if not in the store (initialization)
    const hasState = useInitState("eletronics", id, createLight(batteryId));

    const dispatch = useDispatch();

    useTick(1, () => {
        if (!hasState)
            return;

        const eletronics = store.getState().eletronics;
        const lightState = eletronics[id];

        if (!lightState.battery)
            return;

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
    const flashlight = useSelector(state =>
        state.items.ids.flashlight?.found && state.items.charges.flashlight?.charge >= 20
    );

    useEffect(() => {
        level.current.style.visibility = (status || flashlight) ? 'visible' : 'hidden';
    }, [level, status, flashlight]);

    if (!hasState)
        return null;

    const opacity = heat > 100 ? 0 : (1 - heat / 100);

    // No lights
    if (!status && !flashlight) {
        return (
            <div
                className="light-common light-darkness"
                style={{
                    position: global && !reached100Heat ? "fixed" : "absolute",
                }}
            />
        )
    }

    // Using flashlight
    if (!status && flashlight) {
        return <LightFromFlashlight />
    }

    // Light on and heating
    if (opacity > 0) {
        return (
            <div
                className="light-common light-heating"
                style={{
                    position: global && !reached100Heat ? "fixed" : "absolute",
                    opacity
                }}
            />
        )

    }
}

export default Light;
