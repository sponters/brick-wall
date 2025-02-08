import React, { createContext } from "react";
import { useSelector } from "react-redux";
import { selectLevel } from "state/slices/levelsSlice";

export const LevelContext = createContext(null);

function Level({ levelId, front, light, children }) {
    let all = children;

    if (!front)
        all = React.Children.toArray(children).reverse();

    const hasLevel = useSelector(state => !!selectLevel(state, levelId));

    return (
        <LevelContext.Provider value={{ levelId, front }}>
            <div className="level"
                style={{
                    direction: front ? "ltr" : "rtl",
                    visibility: hasLevel ? "visible" : "hidden"
                }}
            >
                {all}
                {light}
            </div>
        </LevelContext.Provider >
    )
}

export default Level;
