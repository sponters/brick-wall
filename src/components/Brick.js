import { useSelector } from 'react-redux'
import { hit } from '../engine/brick'

import '../game.css';

function Brick({ row, col }) {
  const id = `b_${row}_${col}`;
  const brickState = useSelector(state => state.wall[id]);
  const visibility = brickState === false ? 'hidden' : 'visible';

  return (
    <div
      className="brick"
      onMouseDown={(e) => hit(id)}
      style={{visibility: visibility}}
    ></div>
  );
}

export default Brick;
