import CollectableObject from '../CollectableObject';
import { default as ControllerVisual, size } from '../../visuals/Controller'

function Controller(props) {
    return (
        <CollectableObject height={size.height} width={size.width} {...props}>
            <ControllerVisual />
        </CollectableObject>
    )
}

export default Controller;
