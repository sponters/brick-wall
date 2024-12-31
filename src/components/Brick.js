import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { hit } from '../engine/brick'
import hitImage from '../img/hit.png'

import '../game.css';

function Brick({ row, col }) {
  const id = `b_${row}_${col}`;
  const brickState = useSelector(state => state.wall[id]);
  const visibility = brickState === false ? 'hidden' : 'visible';

  const [hits, setHits] = useState([]);

  const onMouseDown = useCallback(() => {
    hit(id);
    setHits([...hits, Math.floor(Math.random() * 360)]);
    setTimeout(() => {
      const [first, ...rest] = hits;
      setHits(rest);
    }, 100);
  }, [id, hits, setHits]);

  return (
    <div className='brick-container'>
      <div
        className="brick"
        onMouseDown={onMouseDown}
        style={{visibility: visibility}}
      />
      {hits.map((value, index) => {
        return <img
          key={index}
          className="brickHit unselectable"
          src={hitImage} 
          style={{rotate: `${value}deg`}} 
        />
      })}
    </div>
  );
}

export default Brick;
