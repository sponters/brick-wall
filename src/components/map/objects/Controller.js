import InventoryItem from '../InventoryItem';

function Controller(props) {
    return (
        <InventoryItem
            id="controller"
            style={{ transform: "rotate(30deg)" }}
            {...props}
        >
            <div className="tech-black-frame">
                <div className="controller-screen">
                    ≡≡<br />▒▒
                </div>
            </div>
        </InventoryItem>
    )
}

export default Controller;
