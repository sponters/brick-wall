import { useTranslation } from 'react-i18next';

import 'css/game.css';
import 'css/wall.css';
import 'css/eletronics.css';
import 'css/brick.css';
import 'css/upgrade.css';
import 'css/items.css';

import Resources from './Resources';
import Upgrades from './Upgrades';
import Level1 from './map/levels/Level1'

import { resetState } from '../engine/save';

function Game() {
    const { t } = useTranslation();

    return ([
        <div key="header" id="header" className="unselectable">
            <h1>Brick Wall</h1>
        </div>,
        <div key="left" id="left" className="unselectable">
            <Resources />
        </div>,
        <div key="right" id="right" className="unselectable">
            <Upgrades />
        </div>,
        <div key="center" id="center" className="unselectable">
            <Level1 />
        </div>,
        <div key="footer" id="footer">
            <div id="footer-menu">
                <span className="unselectable" onClick={resetState} id="reset">{t("menu.reset")}</span>
            </div>
        </div>
    ]);
}

export default Game;
