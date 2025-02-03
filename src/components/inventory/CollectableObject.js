import { useEffect, useRef } from "react";

function CollectableObject({ height, width, collectablesRef, children }) {
    const collectableRef = useRef(null);
    const tooltipRef = useRef(null);

    useEffect(() => {
        const csRect = collectablesRef.current.getBoundingClientRect();
        const cRect = collectableRef.current.getBoundingClientRect();
        const left = Math.round(cRect.left - csRect.left);
        console.log(csRect, cRect, left);
        tooltipRef.current.style.left = `-${left}px`;
        tooltipRef.current.style.width = `${Math.round(csRect.width)}px`;

    }, [collectablesRef, collectableRef, tooltipRef]);

    return (
        <div
            className="collectable"
            ref={collectableRef}
            style={{
                width: `calc(${width} * var(--wall-cell-width)`,
                height: `calc(${height} * var(--wall-cell-height)`,
            }}
        >
            {children}
            <div className="tooltip" ref={tooltipRef}>xxx</div>
        </div>
    )
}

export default CollectableObject;
