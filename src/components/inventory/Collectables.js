import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux'
import Controller from './objects/Controller';
import Flashlight from './objects/Flashlight';
import { useRef } from 'react';

function Collectables() {
    const { t } = useTranslation(null, { keyPrefix: `items.meta` });

    const collectablesRef = useRef(null);

    const controller = useSelector(state => state.items.ids.controller.found);
    const flashlight = useSelector(state => state.items.ids.flashlight.found);

    const unlocked = controller || flashlight;

    if (!unlocked)
        return null;

    return (
        <div className="inventory-container" ref={collectablesRef}>
            <div className="header">{t("collectables")}</div>
            <div className="collectables">
                {controller && <Controller collectablesRef={collectablesRef} />}
                {flashlight && <Flashlight collectablesRef={collectablesRef} />}
            </div>
        </div>
    );
}

export default Collectables;
