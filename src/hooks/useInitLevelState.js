import { useSelector } from "react-redux";
import { useEffect } from "react";

function useInitLevelState(level, id, initCallback) {
    const hasState = useSelector(state => !!state.level[level][id]);
    useEffect(() => {
        if (!hasState)
            initCallback();
    }, [hasState, initCallback]);
    return hasState;
}


export default useInitLevelState;
