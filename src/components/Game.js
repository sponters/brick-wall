import React from 'react';
import { useTranslation } from 'react-i18next';

import 'css/game.css';
import 'css/wall.css';
import 'css/visuals.css';
import 'css/brick.css';
import 'css/upgrade.css';
import 'css/light.css';
import 'css/inventory.css';

import Resources from './inventory/Resources';
import Invetory from './inventory/Collectables';
import Upgrades from './upgrades/Upgrades';
import Connections from './upgrades/Connections';
import Level1 from './map/levels/Level1'

import { resetState } from '../engine/save';
import { useState } from 'react';


function Game() {
    const { t } = useTranslation();

    const [suffix, setSuffix] = useState(0);

    const handleResetClick = () => {
        resetState();
        setSuffix(suffix + 1);
    }

    return ([
        <div key={`header_${suffix}`} id="header" className="unselectable">
            <h1>Brick Wall</h1>
        </div>,
        <div key={`left_${suffix}`} id="left" className="unselectable">
            <Resources />
            <Invetory />
        </div>,
        <div key={`right_${suffix}`} id="right" className="unselectable">
            <Upgrades />
            <Connections />
        </div>,
        <div key={`center_${suffix}`} id="center" className="unselectable">
            <Level1 />
        </div>,
        <div key={`footer_${suffix}`} id="footer">
            <div id="footer-menu">
                <span className="unselectable" onClick={handleResetClick} id="reset">{t("menu.reset")}</span>
            </div>
        </div>
    ]);
}

export default Game;
