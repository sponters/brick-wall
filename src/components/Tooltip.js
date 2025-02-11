import React from 'react';
import { useTranslation } from 'react-i18next';

function Tooltip({ tInfo, tooltip: tooltips = [], values = {}, sections = {}, ...props }) {
    const { t: tCommon } = useTranslation(null, { keyPrefix: `common` });
    const { t: tRes } = useTranslation(null, { keyPrefix: `inventory.res` });

    function getSection(tooltip) {
        if (sections[tooltip])
            return sections[tooltip];
        return tCommon(tooltip);
    }

    function getValue(tooltip) {
        if (tooltip === "cost") {
            const formattedCost = Object.keys(values.cost).map(key => {
                const resName = tRes(`${key}.name`);
                const amount = values.cost[key];
                return `${resName}: ${amount}`;
            }).join(", ");
            return formattedCost;
        }
        if (tooltip === "ports") {
            return (
                <div key={"ports_value"} style={{ display: "inline-block" }}>
                    {Object.keys(values.ports).map(port =>
                        <div key={port} style={{ textAlign: "left" }}>
                            <span className="port">{port}</span>
                            <span>: {tInfo(`ports.${port}`)}</span>
                        </div>
                    )}
                </div>
            );
        }
        if (values[tooltip])
            return values[tooltip];
        return tInfo(tooltip);
    }

    if (tooltips.length === 0)
        return null;

    return (
        <div className="tooltip" {...props}>
            {tooltips.map((tooltip, index) => [
                <div
                    key={tooltip}
                    className={index === 0 ? "section" : "section separator"}
                >
                    {getSection(tooltip)}
                </div>,
                getValue(tooltip)
            ])}
        </div>
    )
}

export default Tooltip;
