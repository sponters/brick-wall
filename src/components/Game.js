import { useSelector } from 'react-redux'

import '../game.css';

import BrickRow from './BrickRow';

import { numCols, numRows} from '../consts';

function Game() {
  const res = useSelector(state => state.res);

  const rows = []
  for (let i = 0; i < numRows; i++) {
    rows.push(<BrickRow key={`r_${i}`} row={i} numCols={numCols + i % 2} />)
  }

  return (
    <div>
      <div id="header">Header</div>
      <div id="left">Left<br />{res.bricks}</div>
      <div id="center">
        {rows}
      </div>
      <div id="right">Right</div>
    </div>
  );
}

export default Game;
