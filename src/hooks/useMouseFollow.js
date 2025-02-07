import { useEffect } from "react";

function useMouseFollow(id, callback) {
    
    useEffect(() => {
        const element = document.getElementById(id);

        const handler = event => {
            if (!element)
                return;

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
    }, [id, callback]);
}

export default useMouseFollow;
