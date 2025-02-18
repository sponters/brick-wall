import React from 'react';
import InventoryItem from '../InventoryItem';
import { default as ControllerVisual, size } from '../../visuals/Controller'
import { useDispatch, useSelector } from 'react-redux';
import { selectConnectionController, selectUpgrade, switchController } from 'state/slices/improvementsSlice';

function Controller(props) {
    const controllerStatus = useSelector(selectConnectionController);
    const upgraded = useSelector(state => selectUpgrade(state, "global", "controller", "controllerUpgrade")?.info.level >= 1);
    const dispatch = useDispatch();

    const version = upgraded ? 2 : 1;

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
            <ControllerVisual version={version} />
        </InventoryItem>
    )
}

export default Controller;
