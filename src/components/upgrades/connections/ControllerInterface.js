import { useTranslation } from "react-i18next";

function ControllerInterface({ port, id }) {
    const { t } = useTranslation(null, { keyPrefix: 'upgrades.meta.controller' });


    return (
        <div className="upgrades-container">
            <div className="header">{t('title')} {port}</div>
        </div>
    )
}

export default ControllerInterface;
