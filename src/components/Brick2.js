import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { init } from '../redux/slices/wallSlice'
import { hit, createBrick } from '../engine/brick'
import images from '../img'

function Brick({ id, type, row, col, height, width, disabled=false }) {
  // Create state if not in the store (initialization)
  const hasState = useSelector(state => !!state.wall[id]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!hasState)
      dispatch(init({ id, initialState: createBrick(type) }));
  }, [id, type, dispatch, hasState]);

  // Prepare render
  const health = useSelector(state => state.wall[id]?.health);
  const damage = useSelector(state => state.items.hammer.damage);
  const visibility = health === 0 ? 'hidden' : 'visible';
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
          visibility: visibility,
          backgroundImage: `url(${images[type]})`
        }}
      />
      { glow && <div className="brick-glow" /> }
      {hits.map((value, index) => {
        return <img
          key={index}
          alt="Pow!"
          className="brickHit unselectable"
          src={images.hit} 
          style={{transform: `translate(-50%, -50%) rotate(${value}deg)`}}
        />
      })}
    </div>
  );
}

export default Brick;
