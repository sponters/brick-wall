import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux'
import Controller from './objects/Controller';

function Collectables() {
    const { t } = useTranslation(null, { keyPrefix: `items` });

    const controller = useSelector(state => state.items.controller.found);

    const unlocked = controller;

    if (!unlocked)
        return null;

    return (
        <div className="inventory-container">
            <div className="header">Collectables</div>
            {controller && <Controller />}
        </div>
    );
}

export default Collectables;
