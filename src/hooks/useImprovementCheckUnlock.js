import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import upgrades from "engine/upgrades";
import { selectUpgrade, unlock } from "state/slices/improvementsSlice";

function useImprovementCheckUnlock(levelId, ownerId, upgradeId) {
    const unlockedStatus = useSelector(state => {
        if (selectUpgrade(state, levelId, ownerId, upgradeId).unlocked)
            return 2;
        return upgrades[upgradeId].checkUnlock(state, levelId, ownerId) ? 1 : 0;
    });
    const dispatch = useDispatch();
    useEffect(() => {
        if (unlockedStatus === 1) 
            dispatch(unlock({ levelId, ownerId, upgradeId }));
    }, [unlockedStatus, levelId, ownerId, upgradeId, dispatch]);

    return unlockedStatus > 0;
}

export default useImprovementCheckUnlock;