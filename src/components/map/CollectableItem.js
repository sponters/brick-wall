import React from "react";
import { useDispatch, useSelector } from "react-redux";
import WallObject from "./WallObject";
import { selectItemInfo, setItemInfo } from "state/slices/inventorySlice";

function CollectableItem({ itemId, children }) {
    const found = useSelector(state => selectItemInfo(state, itemId).found);

    const dispatch = useDispatch();

    if (found)
        return null;

    const handleClick = () => {
        dispatch(setItemInfo({ itemId, value: { found: true } }));
    }

    return (
        <WallObject
            className="collectable-item"
            onClick={handleClick}
        >
            {children}
        </WallObject>
    )
}

export default CollectableItem;
