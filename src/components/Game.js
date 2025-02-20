import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import 'css/game.css';
import 'css/wall.css';
import 'css/visuals.css';
import 'css/brick.css';
import 'css/upgrade.css';
import 'css/light.css';
import 'css/inventory.css';
import 'css/tooltip.css';
import 'css/effects.css';

import Resources from './inventory/Resources';
import Score from './inventory/Score';
import Items from './inventory/Items';
import Upgrades from './improvements/Upgrades';
import Connections from './improvements/Connections';
import Level1 from './map/levels/Level1'

import { exportState, loadState, resetState } from '../engine/save';
import { useState } from 'react';
import { GameStatus, isDev } from 'consts';
import store from 'state/store';
import ImportModal from './menu/ImportModal';


function Game() {
    const { t } = useTranslation();

    const [status, setStatus] = useState(GameStatus.loading);
    const [importing, setImporting] = useState(false);

    useEffect(() => {
        if (status === GameStatus.loading) {
            loadState();
            setStatus(GameStatus.running);
            return;
        }
        if (status === GameStatus.resetting) {
            resetState();
            setStatus(GameStatus.running);
            return;
        }
    }, [status]);

    if (status !== GameStatus.running)
        return null;

    return ([
        <div key="header" id="header" className="unselectable">
            <h1>Brick Wall</h1>
        </div>,
        <div key="suffix" id="left" className="unselectable">
            <Score />
            <Resources />
            <Items />
        </div>,
        <div key="right" id="right" className="unselectable">
            <Upgrades />
            <Connections />
        </div>,
        <div key="center" id="center" className="unselectable">
            <Level1 />
        </div>,
        <div key="footer" id="footer">
            <div id="footer-menu">
                {isDev() && <span
                    className="unselectable"
                    onClick={() => console.log(store.getState())}
                >
                    Debug
                </span>}
                <span
                    className="unselectable"
                    onClick={() => setImporting(!importing)}
                >
                    Import
                </span>
                <span
                    className="unselectable"
                    onClick={() => exportState()}
                >
                    Export
                </span>
                <span
                    className="unselectable"
                    onClick={() => setStatus(GameStatus.resetting)}
                >
                    {t("menu.reset")}
                </span>
            </div>
        </div>,
        importing ? <ImportModal onClose={() => setImporting(false)} /> : null
    ]);
}

export default Game;
