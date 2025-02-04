import { useEffect } from "react";
import { addTickCallback, delTickCallback } from "engine/loop";

function useTick(priority, memoizedCallback) {
    useEffect(() => {
        addTickCallback(priority, memoizedCallback);
        return () => { delTickCallback(priority, memoizedCallback) };
    }, [priority, memoizedCallback]);
}

export default useTick;