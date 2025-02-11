import React from 'react';
import InventoryItem from '../InventoryItem';
import { default as FlashlightVisual, size } from '../../visuals/Flashlight'

function Flashlight(props) {
    return (
        <InventoryItem
            itemId="flashlight"
            height={size.height}
            width={size.width}
            tooltip={["description", "ports"]}
            {...props}
        >
            <FlashlightVisual />
        </InventoryItem>
    )
}

export default Flashlight;
