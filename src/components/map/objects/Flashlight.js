import CollectableObject from '../CollectableObject';
import { default as FlashlightVisual, size }from '../../visuals/Flashlight'

function Flashlight(props) {
    return (
        <CollectableObject
            id="flashlight"
            width={size.width}
            height={size.height}
            {...props}
        >
            <FlashlightVisual />
        </CollectableObject>
    )
}

export default Flashlight;
