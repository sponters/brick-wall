import { useCallback, useEffect } from "react";
import { addTickCallback, delTickCallback } from "../engine/loop";

function useTick(callback, deps) {
    // eslint-disable-next-line
    const memoized = useCallback(callback, [...deps]);
    useEffect(() => {
        addTickCallback(memoized);
        return () => { delTickCallback(memoized) };
    }, [memoized]);
}

export default useTick;