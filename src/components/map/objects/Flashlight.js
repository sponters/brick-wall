import React from 'react';
import CollectableItem from '../CollectableItem';
import { default as FlashlightVisual, size } from '../../visuals/Flashlight'

function Flashlight(props) {
    return (
        <CollectableItem
            itemId="flashlight"
            width={size.width}
            height={size.height}
            {...props}
        >
            <FlashlightVisual />
        </CollectableItem>
    )
}

export default Flashlight;
