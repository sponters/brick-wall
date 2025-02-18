import { createSelector } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectAllItems } from "state/slices/inventorySlice";

function useHasItemWithPort(port) {
    const selectHasItem = useMemo(() => createSelector(
        [selectAllItems],
        (items) => Object.keys(items)
            .filter(itemId =>
                items[itemId].ports?.[port] &&
                items[itemId].found
            )
            .reduce((hasItem, itemId) => {
                return Math.max(hasItem, items[itemId].hasCharge ? 2 : 1)
            }, 0)
    ), [port]);

    return useSelector(selectHasItem);
}

export default useHasItemWithPort;