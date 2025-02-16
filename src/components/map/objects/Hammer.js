import React from 'react';
import CollectableItem from '../CollectableItem';
import { default as HammerVisual, size } from '../../visuals/Hammer'

function Hammer(props) {
    return (
        <CollectableItem
            {...props}
            itemId="hammer"
            width={size.width * 2}
            height={size.height * 2}
            data-obj-type="hammer"
        >
            <HammerVisual />
        </CollectableItem>
    )
}

export default Hammer;
