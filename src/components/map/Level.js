import React, { createContext } from "react";

export const LevelContext = createContext(null);

function Level({ levelRef, reverse, light, children }) {
    let all = children;

    if (reverse)
        all = React.Children.toArray(children).reverse();

    return (
        <LevelContext.Provider value={reverse}>
            <div className="level" ref={levelRef} style={{ direction: reverse ? "rtl" : "ltr" }} >
                {all}
                {light}
            </div>
        </LevelContext.Provider >
    )
}

export default Level;
