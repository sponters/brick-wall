import React from "react";
import { useTranslation } from "react-i18next";
import ControllerUpgrade from "../upgrades/ControllerUpgrade";

function ControllerInterface() {
    const { t } = useTranslation(null, { keyPrefix: 'improvements.containers.controller' });

    return (
        <div className="upgrades-container">
            <div className="header">{t('title')}</div>
            <ControllerUpgrade levelId="global" ownerId="controller" upgradeId="hashGenerator" />
            <ControllerUpgrade levelId="global" ownerId="controller" upgradeId="hashGeneratorSpeed" sections={["description", "effect", "cost"]} />
        </div>
    )
}

export default ControllerInterface;
