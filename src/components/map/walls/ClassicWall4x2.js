import { wallCols, wallRows } from 'consts';
import Brick from './Brick';
import BrickShadow from './BrickShadow';

import { LevelContext } from '../Level';
import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { wallInit } from 'state/slices/wallSlice';
import { createBrickState } from 'engine/brick'

function ClassicWall4x2({ id, batteryId, brickType, layout }) {
    const front = useContext(LevelContext);

    const brickData = [];

    const numRows = wallRows / 2 - 1;
    const numCols = wallCols / 4;

    const startRow = 2 - layout;
    const startCol = 1;

    for (let i = 0; i < numRows; i++) {
        const parity = (i % 2) === layout;
        const rowNumCols = numCols - (parity ? 0 : 1);
        for (let k = 0; k < rowNumCols; k++) {
            const j = front ? k : rowNumCols - k - 1;
            const row = i * 2 + startRow;
            const col = j * 4 + (parity ? 0 : 2) + startCol + layout;
            const brickId = `${id}_r${row}_c${col}`;
            const disabled = (i === 0) || (i === numRows - 1) || (j === 0) || (j === rowNumCols - 1);
            brickData.push([brickId, row, col, disabled]);
        }
    }

    const dispatch = useDispatch()
    const hasWallState = useSelector(state => !!state.wall[brickData[0][0]]);

    useEffect(() => {
        if (!hasWallState) {
            const initialStates = {};
            for(const [brickId] of brickData)
                initialStates[brickId] = createBrickState(batteryId, brickType);
            dispatch(wallInit(initialStates));
        }
    });

    const bricks = [];
    const shadows = [];

    for(const [brickId, row, col, disabled] of brickData) {
        bricks.push(
            <Brick
                key={brickId}
                id={brickId}
                type={brickType}
                row={row}
                col={col}
                height={2}
                width={4}
                disabled={disabled}
            />
        )
        shadows.push(
            <BrickShadow
                key={brickId + "_s"}
                id={brickId}
                row={row}
                col={col}
                height={2}
                width={4}
            />
        )
    }

    return [...shadows, ...bricks];
}

export default ClassicWall4x2;
