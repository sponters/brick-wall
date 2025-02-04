import React from 'react';
import { useSelector } from 'react-redux'

function BrickShadow({ id, row, col, height, width }) {
  // Prepare render
  const health = useSelector(state => state.wall[id]?.health);

  // Discard render when without state
  if (!health || (health <= 0))
    return null;

  const placementStyle = {
    gridRow: `${row} / ${row + height}`,
    gridColumn: `${col} / ${col + width}`,
  }

  return <div className='brick-shadow' style={placementStyle} dir="ltr" />;
}

export default BrickShadow;
