import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux'
import Controller from './objects/Controller';
import Flashlight from './objects/Flashlight';

function Collectables() {
    const { t } = useTranslation(null, { keyPrefix: `items` });

    const controller = useSelector(state => state.items.controller.found);
    const flashlight = useSelector(state => state.items.flashlight.found);

    const unlocked = controller || flashlight;

    if (!unlocked)
        return null;

    return (
        <div className="inventory-container">
            <div className="header">Collectables</div>
            {controller && <Controller />}
            {flashlight && <Flashlight />}
        </div>
    );
}

export default Collectables;
