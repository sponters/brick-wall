import React from 'react';
import CollectableObject from '../CollectableObject';
import { default as ControllerVisual, size } from '../../visuals/Controller'
import { useDispatch, useSelector } from 'react-redux';
import { controller } from 'state/slices/connectionSlice';

function Controller(props) {
    const controllerStatus = useSelector(state => state.connection.controller);
    const dispatch = useDispatch();

    const handleOnClick = () => {
        dispatch(controller(!controllerStatus));
    }

    return (
        <CollectableObject
            itemId="controller"
            height={size.height}
            width={size.width}
            onClick={handleOnClick}
            {...props}
        >
            <ControllerVisual />
        </CollectableObject>
    )
}

export default Controller;
