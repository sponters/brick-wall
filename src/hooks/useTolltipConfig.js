import { useEffect } from "react";

function getNearestPositioned(element) {
    let current = element;
    while(current.parentNode !== null) {
        if (getComputedStyle(current.parentNode).position !== 'static')
            return current.parentNode;
        current = current.parentNode;
    }
    return current;
}

function useTooltipConfig(areaRef, tooltipRef, debug=false) {
    useEffect(() => {

        if (!tooltipRef.current || !areaRef.current)
            return;

        const containerRect = getNearestPositioned(tooltipRef.current).getBoundingClientRect();
        const areaRect = areaRef.current.getBoundingClientRect();
        const top = Math.round(areaRect.y - containerRect.y + areaRect.height) + 10;
        tooltipRef.current.style.top = `${top}px`;

        if (debug) {
            console.log(containerRect);
            console.log(areaRect);
        }

        const handleMouseEnter = () => {
            tooltipRef.current.style.visibility = "visible";
        }
        const handleMouseLeave = () => {
            tooltipRef.current.style.visibility = "hidden";
        }

        const areaRefCurrent = areaRef.current;
        areaRefCurrent.addEventListener("mouseenter", handleMouseEnter);
        areaRefCurrent.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            if (areaRefCurrent !== null) {
                areaRefCurrent.removeEventListener("mouseenter", handleMouseEnter);
                areaRefCurrent.removeEventListener("mouseleave", handleMouseLeave);
            }
        }
    });
}

export default useTooltipConfig;