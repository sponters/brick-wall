import { speedTicksToSeconds } from 'engine/time';
import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectAllIRes } from 'state/slices/inventorySlice';

function getNearestPositioned(element) {
    let current = element;
    while(current.parentNode !== null) {
        if (getComputedStyle(current.parentNode).position !== 'static')
            return current.parentNode;
        current = current.parentNode;
    }
    return current;
}

function TooltipCost({ cost }) {
    const { t: tRes } = useTranslation(null, { keyPrefix: `inventory.res` });
    const res = useSelector(state => selectAllIRes(state));

    return Object.keys(cost).map(key => {
        const resName = tRes(`${key}.name`);
        const amount = cost[key];
        const cur = res[key].cur;
        const hasAmount = cur >= cost[key];
        return <div key={resName} style={{color: hasAmount ? "#5bbe2a": "red"}}>{resName}: {amount} / {cur}</div>
    });

}

function TooltipConsume({ consume }) {
    const { t: tRes } = useTranslation(null, { keyPrefix: `inventory.res` });

    return Object.keys(consume).map(key => {
        const resName = tRes(`${key}.name`);
        const amount = speedTicksToSeconds(consume[key]);
        return <div key={resName}>{resName}: {amount} / sec</div>
    });
}

function Tooltip({ tInfo, sections = [], extras = {}, ownerRef, ...props }) {
    const { t: tCommon } = useTranslation(null, { keyPrefix: `common` });

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
            return [<TooltipCost key="cost_value" cost={extras.values.cost} />]
        }
        if (tooltip === "consume") {
            return [<TooltipConsume key="consume_value" consume={extras.values.consume} />]
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
