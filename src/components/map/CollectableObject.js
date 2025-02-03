import { useDispatch, useSelector } from "react-redux";
import { set } from "state/slices/itemsSlice";

function CollectableObject({ id, row, col, height, width, style, children }) {
    const found = useSelector(state => state.items.ids[id].found)

    const dispatch = useDispatch();

    if (found)
        return null;

    const handleClick = () => {
        dispatch(set({ ids: { [id]: { found: true } } }));
    }

    const placementStyle = {
        gridRow: `${row} / ${row + height}`,
        gridColumn: `${col} / ${col + width}`,
    }

    return (
        <div
            className="collectable-item"
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

export default CollectableObject;
