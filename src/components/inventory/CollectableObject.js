import React from "react";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

function CollectableObject({ itemId, height, width, collectablesRef, onClick, children }) {
    const collectableRef = useRef(null);
    const tooltipRef = useRef(null);

    const { t } = useTranslation(null, { keyPrefix: `items.${itemId}` });
    const { t: tMeta } = useTranslation(null, { keyPrefix: `items.meta` });

    const ports = useSelector(state => state.items.ids[itemId].ports);

    useEffect(() => {
        const csRect = collectablesRef.current.getBoundingClientRect();
        const cRect = collectableRef.current.getBoundingClientRect();
        const left = Math.round(cRect.left - csRect.left);
        tooltipRef.current.style.left = `-${left - 5}px`;

    }, [collectablesRef, collectableRef, tooltipRef]);

    const handleMouseEnter = () => {
        tooltipRef.current.style.visibility = "visible";
    }
    const handleMouseLeave = () => {
        tooltipRef.current.style.visibility = "hidden";
    }

    return (
        <div
            className="collectable"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            ref={collectableRef}
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

export default CollectableObject;
