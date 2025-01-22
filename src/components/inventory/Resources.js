import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux'

function Resources() {
    const { t } = useTranslation(null, { keyPrefix: `items` });

    const brick = useSelector(state => state.res.brick.unlocked ? state.res.brick.cur : -1);

    const unlocked = brick >= 0;

    if (!unlocked)
        return null;

    return (
        <div className="inventory-container">
            <div className="header">Resources</div>
            {brick >= 0 ? (<div>{t('brick.name')}: {brick}</div>) : ""}
        </div>
    );
}

export default Resources;
