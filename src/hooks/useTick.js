import { useCallback, useEffect } from "react";
import { addTickCallback, delTickCallback } from "engine/loop";

function useTick(priority, callback, deps) {
    // eslint-disable-next-line
    const memoized = useCallback(callback, [...deps]);
    useEffect(() => {
        addTickCallback(priority, memoized);
        return () => { delTickCallback(priority, memoized) };
    }, [priority, memoized]);
}

export default useTick;