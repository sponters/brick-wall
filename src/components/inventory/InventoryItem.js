import React from "react";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectItemInfo } from "state/slices/inventorySlice";

function InventoryItem({ itemId, height, width, containerRef, children, ...props }) {
    const itemRef = useRef(null);
    const tooltipRef = useRef(null);

    const { t } = useTranslation(null, { keyPrefix: `items.${itemId}` });
    const { t: tMeta } = useTranslation(null, { keyPrefix: `items.meta` });

    const ports = useSelector(state => selectItemInfo(state, itemId).ports);

    useEffect(() => {
        const csRect = containerRef.current.getBoundingClientRect();
        const cRect = itemRef.current.getBoundingClientRect();
        const left = Math.round(cRect.left - csRect.left);
        tooltipRef.current.style.left = `-${left - 5}px`;

    }, [containerRef, itemRef, tooltipRef]);

    const handleMouseEnter = () => {
        tooltipRef.current.style.visibility = "visible";
    }
    const handleMouseLeave = () => {
        tooltipRef.current.style.visibility = "hidden";
    }

    return (
        <div
            {...props}
            className="collectable"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={itemRef}
            style={{
                width: `calc(${width} * var(--wall-cell-width)`,
                height: `calc(${height} * var(--wall-cell-height)`,
            }}
        >
            {children}
            <div className="tooltip" ref={tooltipRef}>
                <div className="section">{t('name')}</div>
                {t('description')}
                {ports ? <div className="section separator">{tMeta('ports')}</div> : ""}
                <div style={{ display: "inline-block" }}>
                    {Object.keys(ports).map(port =>
                        <div key={port} style={{ textAlign: "left" }}>
                            <span className="port">{port}</span>
                            <span>: {t(`ports.${port}`)}</span>
                        </div>
                    )}
                </div>
                {t('action') ? <div className="section separator">{tMeta('action')}</div> : ""}
                {t('action')}
            </div>
        </div>
    )
}

export default InventoryItem;
