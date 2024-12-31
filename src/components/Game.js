import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import '../game.css';

import BrickRow from './BrickRow';

import { numCols, numRows} from '../consts';
import { loadState } from '../engine/save';

function Game() {
  // const res = useSelector(state => state.res);

  const rows = []
  for (let i = 0; i < numRows; i++) {
    rows.push(<BrickRow key={`r_${i}`} row={i} numCols={numCols + i % 2} />)
  }

  useEffect(() => loadState(), []);

  return ([
    <div key="header" id="header">Header</div>,
    <div key="left" id="left">Left<br />{0}</div>,
    <div key="center" id="center">{rows}</div>,
    <div key="right" id="right">Right</div>,
    <div key="footer" id="footer">Footer</div>
  ]);
}

export default Game;
