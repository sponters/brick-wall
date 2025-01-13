import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import upgrades from "../engine/upgrades";
import { unlock } from "../redux/slices/upgradesSlice";

function useUpgradeCheckUnlock(id) {
    const unlockedStatus = useSelector(state => {
        if (state.upgrades[id].unlocked)
            return 2;
        return upgrades[id].checkUnlock(state) ? 1 : 0;
    });
    const dispatch = useDispatch();
    useEffect(() => {
        if (unlockedStatus === 1) 
            dispatch(unlock(id));
    }, [unlockedStatus, id, dispatch]);

    return unlockedStatus > 0;
}

export default useUpgradeCheckUnlock;