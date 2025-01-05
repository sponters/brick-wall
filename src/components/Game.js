import '../game.css';

import Resources from './Resources';
import Wall from './Wall';
import Upgrades from './Upgrades';

import { resetState } from '../engine/save';

function Game() {
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
      <Upgrades />
    </div>,
    <div key="footer" id="footer">
      <div id="footer-menu">
        <span className="unselectable" onClick={resetState} id="reset">Reset</span>
      </div>
    </div>
  ]);
}

export default Game;
