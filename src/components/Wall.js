import BrickRow from './BrickRow';
import { numCols, numRows} from '../consts';

function Wall() {
  const rows = []
  for (let i = 0; i < numRows; i++) {
    rows.push(<BrickRow key={`r_${i}`} row={i} numCols={numCols + i % 2} />)
  }

  return (
    <div
      className='wall'
    >
      {rows}
    </div>
  )
}

export default Wall;
