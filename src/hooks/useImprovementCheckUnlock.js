import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import upgrades from "engine/upgrades";
import { unlock } from "state/slices/improvementsSlice";

function useImprovementCheckUnlock(owner, id) {
    const unlockedStatus = useSelector(state => {
        if (state.improvements[owner][id].unlocked)
            return 2;
        return upgrades[id].checkUnlock(state, owner) ? 1 : 0;
    });
    const dispatch = useDispatch();
    useEffect(() => {
        if (unlockedStatus === 1) 
            dispatch(unlock({ owner, id }));
    }, [unlockedStatus, id, dispatch]);

    return unlockedStatus > 0;
}

export default useImprovementCheckUnlock;