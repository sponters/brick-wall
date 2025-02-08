import { useSelector } from "react-redux";
import { useEffect } from "react";
import { selectUpgrade, setUpgrade } from "state/slices/improvementsSlice";
import store from "state/store";

function useInitUpgradeState(levelId, ownerId, upgradeId, initialState) {
    const hasState = useSelector(state => !!selectUpgrade(state, levelId, ownerId, upgradeId));
    useEffect(() => {
        if (!hasState)
            store.dispatch(setUpgrade({ levelId, ownerId, upgradeId, value: initialState}));
    }, [hasState, levelId, ownerId, upgradeId, initialState]);
    return hasState;
}

export default useInitUpgradeState;
