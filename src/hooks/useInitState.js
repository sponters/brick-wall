import { useDispatch, useSelector } from "react-redux";

import { init as initWall } from "../redux/slices/wallSlice";
import { init as initEletronics } from "../redux/slices/eletronicsSlice";

const initers = {
    wall: initWall,
    eletronics: initEletronics
}

function useInitState(slice, id, initialState) {
    const hasState = useSelector(state => !!state[slice][id]);
    const dispatch = useDispatch();
    if (!hasState)
        dispatch(initers[slice]({ id, initialState }));
    return hasState;
}

export default useInitState;