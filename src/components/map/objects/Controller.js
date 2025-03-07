import React from 'react';
import CollectableItem from '../CollectableItem';
import { default as ControllerVisual, size } from '../../visuals/Controller'

function Controller(props) {
    return (
        <CollectableItem
            itemId="controller"
            width={size.width}
            height={size.height}
            {...props}
            data-obj-type="controller"
        >
            <ControllerVisual />
        </CollectableItem>
    )
}

export default Controller;
