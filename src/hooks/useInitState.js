import { useSelector } from "react-redux";
import { useEffect } from "react";

function useInitState(slice, id, initCallback) {
    const hasState = useSelector(state => !!state[slice][id]);
    useEffect(() => {
        if (!hasState)
            initCallback();
    }, [hasState, initCallback]);
    return hasState;
}


export default useInitState;