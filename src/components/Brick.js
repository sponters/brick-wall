import { useState } from 'react';
import { useSelector } from 'react-redux'
import { hit, createBrickState } from '../engine/brick'
import images from '../img'
import useInitState from '../hooks/useInitState';

function Brick({ id, type, row, col, height, width, disabled = false }) {
  // Create state if not in the store (initialization)
  const hasState = useInitState("wall", id, createBrickState(type));

  // Prepare render
  const health = useSelector(state => state.wall[id]?.health);
  const damage = useSelector(state => state.items.hammer.damage);
  const display = health === 0 ? 'none' : 'inline';
  const glow = health > 0 && health <= damage;

  const [hits, setHits] = useState([]);

  // Discard render when without state
  if (!hasState)
    return null;

  const onMouseDown = () => {
    hit(id);
    setHits([...hits, Math.floor(Math.random() * 0)]);
    setTimeout(() => {
      const [, ...rest] = hits;
      setHits(rest);
    }, 100);
  };

  const placementStyle = {
    gridRow: `${row} / ${row + height}`,
    gridColumn: `${col} / ${col + width}`,
  }

  return (
    <div className='brick-wrapper' style={placementStyle}>
      <div
        className="brick"
        onMouseDown={!disabled ? onMouseDown : undefined}
        style={{
          display: display,
          backgroundImage: `url(${images[type]})`
        }}
      />
      {glow && <div className="brick-glow" />}
      {hits.map((value, index) => {
        return <img
          key={index}
          alt="Pow!"
          className="brickHit unselectable"
          src={images.hit}
          style={{ transform: `translate(-50%, -50%) rotate(${value}deg)` }}
        />
      })}
    </div>
  );
}

export default Brick;
