import React from "react";
import { useTranslation } from "react-i18next";
import ControllerUpgrade from "../upgrades/ControllerUpgrade";
import useHasItemWithPort from "hooks/useHasItemWithPort";


function ControlController({ levelId, objId, port }) {
    const { t } = useTranslation(null, { keyPrefix: 'improvements.containers.controlController' });

    const hasItem = useHasItemWithPort(port);

    if (hasItem === 0) {
        return (
            <div className="improvements-container">
                <div className="header">{t('title')}</div>
                <div>{t('noItem')}</div>
            </div>
        );
    }

    if (hasItem === 1) {
        return (
            <div className="improvements-container">
                <div className="header">{t('title')}</div>
                <div>{t('noCharge')}</div>
            </div>
        );
    }

    return (
        <div className="improvements-container">
            <div className="header">{t('title')}</div>
            <ControllerUpgrade levelId={levelId} ownerId={objId} upgradeId="controllerUpgrade" sections={["description", "effect", "cost", "consume", "time"]} />
        </div>
    )
}

export default ControlController;
