import CollectableObject from '../CollectableObject';
import { default as FlashlightVisual, size } from '../../visuals/Flashlight'

function Flashlight(props) {
    return (
        <CollectableObject height={size.height} width={size.width} {...props}>
            <FlashlightVisual />
        </CollectableObject>
    )
}

export default Flashlight;
