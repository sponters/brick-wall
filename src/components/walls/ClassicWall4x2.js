import Brick from '../Brick';
import { wallCols, wallRows } from '../../consts';

function ClassicWall4x2({ layer, brickType, layout, children }) {
    const bricks = []

    const numRows = wallRows / 2 - 1;
    const numCols = wallCols / 4;

    const startRow = 2 - layout;
    const startCol = 1;

    for (let i = 0; i < numRows; i++) {
        const parity = (i % 2) === layout;
        const rowNumCols = numCols - (parity ? 0 : 1);
        for (let j = 0; j < rowNumCols; j++) {
            const row = i * 2 + startRow;
            const col = j * 4 + (parity ? 0 : 2) + startCol + layout;
            const id = `w${layer}_r${row}_c${col}`;
            const disabled = (i === 0) || (i === numRows - 1) || (j === 0) || (j === rowNumCols - 1);
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

    return (
        <div className='wall unselectable' style={{zIndex: layer}}>
            {bricks}
            {children}
        </div>
    );
}

export default ClassicWall4x2;
