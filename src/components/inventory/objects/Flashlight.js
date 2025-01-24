import CollectableObject from '../CollectableObject';
import { default as FlashlightVisual, size } from '../../visuals/Flashlight'

function Flashlight() {
    return (
        <CollectableObject height={size.height} width={size.width}>
            <FlashlightVisual />
        </CollectableObject>
    )
}

export default Flashlight;
