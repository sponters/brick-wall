import React, { createContext, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectLevel } from "state/slices/levelsSlice";
import Effects from "./effects/Effects";
import store from "state/store";
import { selectItemInfo, setScore } from "state/slices/inventorySlice";

export const LevelContext = createContext(null);

function Level({ levelId, front, light, children }) {
    let all = children;

    if (!front)
        all = React.Children.toArray(children).reverse();

    const hasLevel = useSelector(state => !!selectLevel(state, levelId));
    const effectRef = useRef({});

    const mouseRef = useRef({
        intervalId: undefined,
        event: null
    });

    const handleMouseUpLeave = () => {
        if (mouseRef.current.intervalId) {
            clearInterval(mouseRef.current.intervalId);
            mouseRef.current.intervalId = undefined;
        }
    }

    // Remove interval if component umounts.
    useEffect(() => handleMouseUpLeave);

    const handleMouseDown = (event) => {
        const hammer = selectItemInfo(store.getState(), "hammer");

        const dispatchHitEvent = (event) => {
            if (event && hammer.found) {
                const gameHitEvent = new CustomEvent("gameHitEvent", { detail: { damage: hammer.damage }, bubbles: true });
                gameHitEvent.clientX = event.clientX;
                gameHitEvent.clientY = event.clientY;
                const target = document.elementFromPoint(event.clientX, event.clientY);
                target.dispatchEvent(gameHitEvent);
            }
        }
        dispatchHitEvent(event);

        handleMouseUpLeave();
        mouseRef.current.intervalId = setInterval(() => {
            if (mouseRef.current.event)
                dispatchHitEvent(mouseRef.current.event);
        }, hammer.cooldown);
    }

    const handleGameHit = () => { store.dispatch(setScore({ info: { combo: { hits: 0 } } })); };

    return (
        <LevelContext.Provider value={{ levelId, front, effectRef }}>
            <div className="level"
                style={{
                    direction: front ? "ltr" : "rtl",
                    visibility: hasLevel ? "visible" : "hidden",
                }}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUpLeave}
                onMouseMove={(event) => mouseRef.current.event = event}
                onMouseLeave={handleMouseUpLeave}
                ref={(el) => {
                    if (el !== null)
                        el.addEventListener("gameHitEvent", handleGameHit);
                }}
            >
                {all}
                {light}
            </div>
            <Effects />
        </LevelContext.Provider >
    )
}

export default Level;
