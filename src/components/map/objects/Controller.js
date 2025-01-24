import CollectableObject from '../CollectableObject';
import { default as ControllerVisual, size }from '../../visuals/Controller'

function Controller(props) {
    return (
        <CollectableObject
            id="controller"
            width={size.width}
            height={size.height}
            {...props}
        >
            <ControllerVisual />
        </CollectableObject>
    )
}

export default Controller;
