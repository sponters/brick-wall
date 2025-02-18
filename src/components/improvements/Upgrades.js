import React from 'react';
import { useSelector } from 'react-redux';
import InstantUpgrade from './upgrades/InstantUpgrade'
import { useTranslation } from 'react-i18next';
import { selectScore } from 'state/slices/inventorySlice';

function Upgrades() {
    const { t } = useTranslation();
    const unlocked = useSelector(state => selectScore(state).info.level >= 2);

    if (!unlocked)
        return null;

    return (
        <div className="improvements-container">
            <div className="header">{t('improvements.containers.upgrades.title')}</div>
            <div className="upgrades-flex">
                <InstantUpgrade levelId="global" ownerId="player" upgradeId="hammerTechnique" />
                <InstantUpgrade levelId="global" ownerId="player" upgradeId="brickInstaKill" />
                <InstantUpgrade levelId="global" ownerId="player" upgradeId="fasterAutoHammer" />
            </div>
        </div>
    )
}

export default Upgrades;
