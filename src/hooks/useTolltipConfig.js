import { useEffect, useState } from "react";

function useTooltipConfig(ownerRef) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (!ownerRef.current)
            return;

        const handleMouseEnter = () => setShow(true);
        const handleMouseLeave = () => setShow(false);

        const ownerRefCurrent = ownerRef.current;
        ownerRefCurrent.addEventListener("mouseenter", handleMouseEnter);
        ownerRefCurrent.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            if (ownerRefCurrent !== null) {
                ownerRefCurrent.removeEventListener("mouseenter", handleMouseEnter);
                ownerRefCurrent.removeEventListener("mouseleave", handleMouseLeave);
            }
        }
    });

    return show;
}

export default useTooltipConfig;