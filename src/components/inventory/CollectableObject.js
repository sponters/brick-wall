function CollectableObject({ height, width, children }) {
    return (
        <div
            style={{
                position: "relative",
                display: "inline-block",
                width: `calc(${width} * var(--wall-cell-width)`,
                height: `calc(${height} * var(--wall-cell-height)`,
            }}
        >
            {children}
        </div>
    )
}

export default CollectableObject;
