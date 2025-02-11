import React from 'react';
import { useSelector } from 'react-redux';
import InstantUpgrade from './upgrades/InstantUpgrade'
import { useTranslation } from 'react-i18next';
import { selectTabUnlocked } from 'state/slices/improvementsSlice';

function Upgrades() {
    const { t } = useTranslation();
    const unlocked = useSelector(selectTabUnlocked);

    return (
        <div className="upgrades-container">
            {unlocked && <div className="header">{t('improvements.containers.upgrades.title')}</div>}
            <InstantUpgrade levelId="global" ownerId="player" upgradeId="hammerTechnique" />
        </div>
    )
}

export default Upgrades;
