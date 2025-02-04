import React from "react";
import { useTranslation } from "react-i18next";
import ControllerUpgrade from "../upgrades/ControllerUpgrade";

function ControllerInterface() {
    const { t } = useTranslation(null, { keyPrefix: 'upgrades.meta.controller' });

    return (
        <div className="upgrades-container">
            <div className="header">{t('title')}</div>
            <ControllerUpgrade upgradeId="hashGenerator" />
        </div>
    )
}

export default ControllerInterface;
