import React from 'react';
import { useSelector } from 'react-redux'
import WallObject from '../WallObject';
import { selectBrick } from 'state/slices/levelsSlice';

function BrickShadow({ levelId, brickId, ...props }) {
  // Prepare render
  const health = useSelector(state => selectBrick(state, levelId, brickId)?.info?.health);

  // Discard render when without state
  if (!health || (health <= 0))
    return null;

  return <WallObject {...props} className='brick-shadow' dir="ltr" />;
}

export default BrickShadow;
