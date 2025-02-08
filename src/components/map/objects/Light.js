import React, { useCallback, useEffect, useRef, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import store from "state/store";
import useTick from "hooks/useTick";
import useInitLevelObjState from "hooks/useInitLevelObjState";
import useMouseFollow from "hooks/useMouseFollow";
import { createLight } from "engine/eletronics";

import { LevelContext } from '../Level';
import { discharge, light, selectObj } from "state/slices/levelsSlice";
import { selectItemInfo, selectItemTick } from "state/slices/inventorySlice";


function LightFromFlashlight() {
    const ref = useRef();

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

function Light({ objId, batteryId, level, global = false }) {
    const { levelId } = useContext(LevelContext);

    // Create state if not in the store (initialization)
    const hasState = useInitLevelObjState(levelId, objId, () => createLight(levelId, objId, batteryId));

    const dispatch = useDispatch();

    useTick(1, useCallback(() => {
        if (!hasState || !batteryId)
            return;

        const battery = selectObj(store.getState(), levelId, batteryId);

        if (battery.charge > 0) {
            dispatch(discharge({ levelId, batteryId, charge: 1 }));
            dispatch(light({ levelId, lightId: objId, status: true }));
        } else {
            dispatch(light({ levelId, lightId: objId, status: false }));
        }
    }, [levelId, objId, batteryId, hasState, dispatch]));

    const lightStatus = useSelector(state => selectObj(state, levelId, objId));

    const flashlight = useSelector(state =>
        selectItemInfo(state, "flashlight").found && selectItemTick(state, "flashlight").charge >= 20
    );

    useEffect(() => {
        if (hasState)
            level.current.style.visibility = (lightStatus.status || flashlight) ? 'visible' : 'hidden';
    }, [level, lightStatus?.status, flashlight, hasState]);

    if (!hasState)
        return null;

    const opacity = lightStatus.heat > 100 ? 0 : (1 - lightStatus.heat / 100);

    // No lights
    if (!lightStatus.status && !flashlight) {
        return (
            <div
                className="light-common light-darkness"
                style={{
                    position: global && !lightStatus.reached100Heat ? "fixed" : "absolute",
                }}
            />
        )
    }

    // Using flashlight
    if (!lightStatus.status && flashlight) {
        return <LightFromFlashlight />
    }

    // Light on and heating
    if (opacity > 0) {
        return (
            <div
                className="light-common light-heating"
                style={{
                    position: global && !lightStatus.reached100Heat ? "fixed" : "absolute",
                    opacity
                }}
            />
        )
    }
}

export default Light;
