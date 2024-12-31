import { useEffect } from 'react'

import '../game.css';

import Resources from './Resources';
import Wall from './Wall';

import { loadState } from '../engine/save';

function Game() {
  useEffect(() => loadState(), []);

  return ([
    <div key="header" id="header">
      Header
    </div>,
    <div key="left" id="left">
      <Resources />
    </div>,
    <div key="center" id="center">
      <Wall />
    </div>,
    <div key="right" id="right">
      Right
    </div>,
    <div key="footer" id="footer">
      Footer
    </div>
  ]);
}

export default Game;
