import Brick from '../Brick2';
import { wallCols, wallRows } from '../../consts';

function ClassicWall4x2({ layer, brickType }) {
    const bricks = []

    const numRows = wallRows / 2 - 1;
    const numCols = wallCols / 4;

    for (let i = 0; i < numRows; i++) {
        const parity = (i % 2) === 0;
        for (let j = 0; j < numCols - (parity ? 0 : 1); j++) {
            const row = i * 2 + 2;
            const col = j * 4 + (parity ? 0 : 2) + 1;
            const id = `w${layer}_r${row}_c${col}`;
            const disabled = (i === 0) || (i === numRows - 1) || (j === 0) || (j === numCols - 1);
            bricks.push(
                <Brick
                    key={id}
                    id={id}
                    type={brickType}
                    row={row}
                    col={col}
                    height={2}
                    width={4}
                    disabled={disabled}
                />
            )
        }
    }

    return <div className='wall'>{bricks}</div>
}

export default ClassicWall4x2;
