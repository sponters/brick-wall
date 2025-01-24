import React, { createContext } from "react";

export const LevelContext = createContext(null);

function Level({ levelRef, front, light, children }) {
    let all = children;

    if (!front)
        all = React.Children.toArray(children).reverse();

    return (
        <LevelContext.Provider value={front}>
            <div className="level" ref={levelRef} style={{ direction: front ? "ltr" : "rtl" }} >
                {all}
                {light}
            </div>
        </LevelContext.Provider >
    )
}

export default Level;
