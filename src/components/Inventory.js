import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux'

function Resources() {
    const { t } = useTranslation(null, { keyPrefix: `items` });

    const controller = useSelector(state => state.items.controller.found);

    const unlocked = controller;

    if (!unlocked)
        return null;

    return [
        <div className="item-container">
            <div className="header">Inventory</div>
            {controller ? (<div>{t('controller.name')}</div>) : ""}
        </div>
    ];
}

export default Resources;
