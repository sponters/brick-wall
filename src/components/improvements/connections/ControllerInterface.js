import React from "react";
import { useTranslation } from "react-i18next";
import ControllerUpgrade from "../upgrades/ControllerUpgrade";

function ControllerInterface() {
    const { t } = useTranslation(null, { keyPrefix: 'improvements.meta.controller' });

    return (
        <div className="upgrades-container">
            <div className="header">{t('title')}</div>
            <ControllerUpgrade levelId="global" ownerId="controller" upgradeId="hashGenerator" />
        </div>
    )
}

export default ControllerInterface;
