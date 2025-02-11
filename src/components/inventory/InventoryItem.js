import Tooltip from "components/Tooltip";
import useTooltipConfig from "hooks/useTolltipConfig";
import React from "react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectItemInfo } from "state/slices/inventorySlice";

function InventoryItem({ itemId, height, width, children, tooltip, values={}, sections={}, ...props }) {
    const { t } = useTranslation(null, { keyPrefix: `inventory.items.${itemId}` });

    const itemInfo = useSelector(state => selectItemInfo(state, itemId));
    const ports = itemInfo.ports;

    const itemRef = useRef();
    const tooltipRef = useRef();
    useTooltipConfig(itemRef, tooltipRef);

    if (!itemInfo.found)
        return null;

    return [
        <div
            key={itemId}
            {...props}
            className="collectable"
            ref={itemRef}
            style={{
                width: `calc(${width} * var(--wall-cell-width)`,
                height: `calc(${height} * var(--wall-cell-height)`,
            }}
        >
            {children}
        </div>,
        <Tooltip
            key={`${itemId}_tooltip`}
            tInfo={t}
            tooltip={tooltip}
            values={{ports, ...values}}
            sections={{description: t("name"), ...sections}}
            ref={tooltipRef}
        />
    ]
}

export default InventoryItem;
