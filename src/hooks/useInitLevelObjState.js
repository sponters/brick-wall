import { useSelector } from "react-redux";
import { useEffect } from "react";
import { selectObj } from "state/slices/levelsSlice";

function useInitLevelObjState(levelId, objId, initCallback) {
    const hasState = useSelector(state => !!selectObj(state, levelId, objId));
    useEffect(() => {
        if (!hasState)
            initCallback();
    }, [hasState, initCallback]);
    return hasState;
}


export default useInitLevelObjState;
