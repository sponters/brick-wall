import React from 'react';
import InventoryItem from '../InventoryItem';
import { default as ControllerVisual, size } from '../../visuals/Controller'
import { useDispatch, useSelector } from 'react-redux';
import { selectConnectionController, switchController } from 'state/slices/improvementsSlice';

function Controller(props) {
    const controllerStatus = useSelector(selectConnectionController);
    const dispatch = useDispatch();

    const handleOnClick = () => {
        dispatch(switchController(!controllerStatus));
    }

    return (
        <InventoryItem
            itemId="controller"
            height={size.height}
            width={size.width}
            onClick={handleOnClick}
            sections={["description", "ports", "action"]}
            {...props}
        >
            <ControllerVisual />
        </InventoryItem>
    )
}

export default Controller;
