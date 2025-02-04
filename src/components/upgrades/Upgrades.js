import { useSelector } from 'react-redux';
import Upgrade from './upgrades/Upgrade'
import { useTranslation } from 'react-i18next';

function Upgrades() {
    const { t } = useTranslation();
    const unlocked = useSelector(state => {
        return state.upgrades.tabUnlocked
    });

    return (
        <div className="upgrades-container">
            {unlocked && <div className="header">{t('upgrades.meta.upgrades')}</div>}
            <Upgrade id="hammerTechnique" />
        </div>
    )
}

export default Upgrades;
