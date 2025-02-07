import { useSelector } from "react-redux";
import { useEffect } from "react";

function useInitLevelObjState(levelId, objId, initCallback) {
    const hasState = useSelector(state => !!state.levels[levelId].objects[objId]);
    useEffect(() => {
        if (!hasState)
            initCallback();
    }, [hasState, initCallback]);
    return hasState;
}


export default useInitLevelObjState;
