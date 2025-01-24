import { useState } from 'react';
import { useSelector } from 'react-redux'
import { hit, createBrickState } from 'engine/brick'
import * as images from 'img'
import useInitState from 'hooks/useInitState';

function Brick({ id, batteryId, type, row, col, height, width, disabled = false }) {
  // Create state if not in the store (initialization)
  const hasState = useInitState("wall", id, createBrickState(batteryId, type));

  // Prepare render
  const health = useSelector(state => state.wall[id]?.health);
  const maxHealth = useSelector(state => state.wall[id]?.maxHealth);
  const display = health === 0 ? 'none' : 'inline';

  const [hits, setHits] = useState([]);

  const cracked1 = ((health / maxHealth) < 0.67) ? ((col * row * 31) % 3 + 1) : 0;
  const cracked2 = ((health / maxHealth) < 0.34) ? ((col * row * 31 + 1) % 3 + 1) : 0;

  const cracked1Img = `cracked${cracked1}`;
  const cracked2Img = `cracked${cracked2}`;

  // Discard render when without state
  if (!hasState)
    return null;

  const onMouseDown = () => {
    const tookDamage = hit(id);

    if (tookDamage) {
      setHits([...hits, Math.floor(Math.random() * 0)]);
      setTimeout(() => {
        const [, ...rest] = hits;
        setHits(rest);
      }, 100);
    }
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
      {cracked1 > 0 &&
        <div
          className="brick-cracked"
          style={{
            display: display,
            backgroundImage: `url(${images[cracked1Img]})`
          }}
        />
      }
      {cracked2 > 0 &&
        <div
          className="brick-cracked"
          style={{
            display: display,
            backgroundImage: `url(${images[cracked2Img]})`
          }}
        />
      }
      {hits.map((value, index) => {
        return <img
          key={index}
          alt="Pow!"
          className="brick-hit unselectable"
          src={images.hit}
          style={{ transform: `translate(-50%, -50%) rotate(${value}deg)` }}
        />
      })}
    </div>
  );
}

export default Brick;
