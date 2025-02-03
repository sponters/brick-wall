import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux'

function Resource({ id }) {
    const { t } = useTranslation(null, { keyPrefix: `items.${id}` });

    const tooltip = useRef(null);

    const brick = useSelector(state => state.res.brick.cur);

    const handleMouseEnter = () => {
        tooltip.current.style.visibility = "visible";
    }
    const handleMouseLeave = () => {
        tooltip.current.style.visibility = "hidden";
    }

    return (
        <div
            className='resource'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {t('name')}: {brick}
            <div className='tooltip' ref={tooltip}>
                <div className="section">Description</div>
                {t('description')}

            </div>
        </div>
    )
}

function Resources() {
    const brick = useSelector(state => state.res.brick.unlocked);

    const unlocked = brick;

    if (!unlocked)
        return null;

    return (
        <div className="inventory-container">
            <div className="header">Resources</div>
            {brick && <Resource id="brick" />}
        </div>
    );
}

export default Resources;
