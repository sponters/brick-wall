import React from 'react';
import CollectableItem from '../CollectableItem';
import { default as FlashlightVisual, size } from '../../visuals/Flashlight'

function Flashlight(props) {
    return (
        <CollectableItem
            {...props}
            itemId="flashlight"
            width={size.width}
            height={size.height}
            data-obj-type="flashlight"
        >
            <FlashlightVisual />
        </CollectableItem>
    )
}

export default Flashlight;
