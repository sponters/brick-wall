import { useDispatch, useSelector } from "react-redux";

import { init as initWall } from "state/slices/wallSlice";
import { init as initEletronics } from "state/slices/eletronicsSlice";
import { useEffect } from "react";

const initers = {
    wall: initWall,
    eletronics: initEletronics
}

function useInitState(slice, id, initialState) {
    const hasState = useSelector(state => !!state[slice][id]);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!hasState)
            dispatch(initers[slice]({ id, initialState }));
    }, [hasState, dispatch, id, initialState, slice]);
    return hasState;
}


export default useInitState;