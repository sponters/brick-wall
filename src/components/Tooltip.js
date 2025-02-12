import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

function getNearestPositioned(element) {
    let current = element;
    while(current.parentNode !== null) {
        if (getComputedStyle(current.parentNode).position !== 'static')
            return current.parentNode;
        current = current.parentNode;
    }
    return current;
}

function Tooltip({ tInfo, sections = [], extras = {}, ownerRef, ...props }) {
    const { t: tCommon } = useTranslation(null, { keyPrefix: `common` });
    const { t: tRes } = useTranslation(null, { keyPrefix: `inventory.res` });

    const tooltipRef = useRef();

    useEffect(() => {
        if (!tooltipRef.current || !ownerRef.current)
            return;

        const containerRect = getNearestPositioned(tooltipRef.current).getBoundingClientRect();
        const areaRect = ownerRef.current.getBoundingClientRect();
        const top = Math.round(areaRect.y - containerRect.y + areaRect.height) + 10;
        tooltipRef.current.style.top = `${top}px`;
    });

    function getSection(tooltip) {
        if (extras.headers?.[tooltip])
            return extras.headers[tooltip];
        return tCommon(tooltip);
    }

    function getValue(tooltip) {
        if (tooltip === "cost") {
            const formattedCost = Object.keys(extras.values.cost).map(key => {
                const resName = tRes(`${key}.name`);
                const amount = extras.values.cost[key];
                return <div key={resName}>{resName}: {amount}</div>
            });
            return formattedCost;
        }
        if (tooltip === "ports") {
            return [
                <div key={"ports_value"} style={{ display: "inline-block" }}>
                    {Object.keys(extras.values.ports).map(port =>
                        <div key={port} style={{ textAlign: "left" }}>
                            <span className="port">{port}</span>
                            <span>: {tInfo(`ports.${port}`)}</span>
                        </div>
                    )}
                </div>
            ];
        }

        let result;

        if (extras.values?.[tooltip])
            result = extras.values[tooltip];
        else
            result = tInfo(tooltip);

        if (result.includes("\n"))
            result = result.split("\n");
        else 
            result = [result];

        return result.map((v, i) => <div key={`${tooltip}_${i}`}>{v}</div>);
    }

    if (sections.length === 0)
        return null;

    return (
        <div className="tooltip" ref={tooltipRef} {...props}>
            {sections.map((tooltip, index) => [
                <div
                    key={tooltip}
                    className={index === 0 ? "section" : "section separator"}
                >
                    {getSection(tooltip)}
                </div>,
                ...getValue(tooltip)
            ])}
        </div>
    )
}

export default Tooltip;
