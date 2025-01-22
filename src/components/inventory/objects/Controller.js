import CollectableObject from '../CollectableObject';
import { default as ControllerVisual, size }from '../../visuals/Controller'

function Controller() {
    return (
        <CollectableObject height={size.height} width={size.width}>
            <ControllerVisual />
        </CollectableObject>
    )
}

export default Controller;
