import { useEffect } from "react";

export function useMouseFollow(id, callback) {
    const element = document.getElementById(id);

    useEffect(() => {
        const handler = event => {
            const rect = element.getBoundingClientRect();

            const inside = 
                event.clientX >= rect.left && 
                event.clientX <= rect.right && 
                event.clientY >= rect.top && 
                event.clientY <= rect.bottom;

            if (!inside)
                callback(0, 0, false);
            else {
                const x = event.clientX - rect.left - rect.width / 2;
                const y = event.clientY - rect.top - rect.height / 2;
                callback(x, y, true);
            }
        }

        document.addEventListener("mousemove", handler);
        return () => { document.removeEventListener("mousemove", handler) }
    }, [element, callback]);
}
