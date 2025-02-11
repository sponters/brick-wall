import React from "react";
import { useDispatch, useSelector } from "react-redux";
import WallObject from "./WallObject";
import { findItem, selectItemInfo } from "state/slices/inventorySlice";

function CollectableItem({ itemId, children, ...props }) {
    const found = useSelector(state => selectItemInfo(state, itemId).found);

    const dispatch = useDispatch();

    if (found)
        return null;

    const handleClick = () => {
        dispatch(findItem(itemId));
    }

    return (
        <WallObject
            {...props}
            className="collectable-item"
            onClick={handleClick}
        >
            {children}
        </WallObject>
    )
}

export default CollectableItem;
