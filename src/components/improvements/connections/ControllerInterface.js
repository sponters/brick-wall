import React from "react";
import { useTranslation } from "react-i18next";
import ControllerUpgrade from "../upgrades/ControllerUpgrade";
import { ConnectionTypes } from "consts";
import { useDispatch, useSelector } from "react-redux";
import { connect, disconnect, selectConnected } from "state/slices/improvementsSlice";
import { selectScore } from "state/slices/inventorySlice";

function ControllerInterface() {
    const { t } = useTranslation(null, { keyPrefix: 'improvements.containers.controller' });

    const connected = useSelector(state => selectConnected(state, "controller", "◘"));
    const dispatch = useDispatch();

    const handlePortClick = () => {
        if (connected)
            dispatch(disconnect("controller"));
        else
            dispatch(connect({ levelId: "global", objId: "controller", port: "◘", type: ConnectionTypes.controller }));
    }

    const portUnlocked = useSelector(state => selectScore(state).info.level >= 5);

    return (
        <div className="improvements-container">
            <div className="header">{t('title')} {portUnlocked && <span className="port" onClick={handlePortClick}>◘</span>}</div>
            <ControllerUpgrade levelId="global" ownerId="controller" upgradeId="hashGenerator" sections={["time"]} />
            <ControllerUpgrade levelId="global" ownerId="controller" upgradeId="hashGeneratorSpeed" sections={["description", "effect", "cost", "time"]} />
            <ControllerUpgrade levelId="global" ownerId="controller" upgradeId="hashGeneratorSpeedV2" sections={["description", "effect", "cost", "consume", "time"]} />
            <ControllerUpgrade levelId="global" ownerId="controller" upgradeId="autoHashGenerator" sections={["description", "cost", "time"]} />
            <ControllerUpgrade levelId="global" ownerId="controller" upgradeId="rainbowGenerator" sections={["description", "consume", "time"]} />
        </div>
    )
}

export default ControllerInterface;
