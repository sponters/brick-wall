import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux'
import { hit } from 'engine/brick'
import * as images from 'img'
import { selectBrick } from 'state/slices/levelsSlice';
import WallObject from '../WallObject';

function Brick({ levelId, brickId, type, disabled = false, ...props }) {
  
  const brickInfo = useSelector(state => selectBrick(state, levelId, brickId)?.info);
  const [hits, setHits] = useState([]);

  // Discard render when without state
  if (!brickInfo)
    return null;

  const display = brickInfo.health === 0 ? 'none' : 'inline';

  const crackValue = brickInfo.health / brickInfo.maxHealth;
  const cracked1 = (crackValue < 0.67) ? brickInfo.cracked1 : 0;
  const cracked2 = (crackValue < 0.34) ? brickInfo.cracked2 : 0;
  const cracked1Img = `cracked${cracked1}`;
  const cracked2Img = `cracked${cracked2}`;

  const onMouseDown = () => {
    const tookDamage = hit(levelId, brickId);

    if (tookDamage) {
      setHits([...hits, Math.floor(Math.random() * 0)]);
      setTimeout(() => {
        const [, ...rest] = hits;
        setHits(rest);
      }, 100);
    }
  };

  return (
    <WallObject {...props} className='brick-wrapper' dir="ltr">
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
    </WallObject>
  );
}

export default Brick;
