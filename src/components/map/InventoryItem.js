import { useDispatch, useSelector } from "react-redux";
import { set } from "state/slices/itemsSlice";

function InventoryItem({ id, row, col, height, width, style, children }) {
    const found = useSelector(state => state.items[id].found)

    const dispatch = useDispatch();

    if (found)
        return null;

    const handleClick = () => {
        dispatch(set({ [id]: { found: true } }));
    }

    const placementStyle = {
        gridRow: `${row} / ${row + height}`,
        gridColumn: `${col} / ${col + width}`,
    }

    return (
        <div
            className="inventory-item"
            style={{
                ...placementStyle,
                ...style
            }}
            onClick={handleClick}
        >
            {children}
        </div>
    )
}

export default InventoryItem;
