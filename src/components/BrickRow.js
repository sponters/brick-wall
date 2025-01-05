import '../game.css';

import Brick from './Brick';

function BrickRow({ row, numCols }) {

    const bricks = [];
    for (let i = 0; i < numCols; i++) {
        bricks.push(<Brick key={`b_${row}_${i}`} type="clayBrick" row={row} col={i} />);
    }

    return (
        <div className="brick-row">
          { bricks }
        </div>
    );
}

export default BrickRow;
