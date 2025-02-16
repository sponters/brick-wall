import React from 'react';
import InventoryItem from '../InventoryItem';
import { default as HammerVisual, size } from '../../visuals/Hammer'
import { selectItemInfo, selectScore } from 'state/slices/inventorySlice';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

function Hammer(props) {
    const { t } = useTranslation(null, { keyPrefix: `inventory.items.hammer` });
    const damage = useSelector(state => selectItemInfo(state, "hammer").damage);

    const hasAutoHit = useSelector(state => selectScore(state).info.level >= 4);

    const action = hasAutoHit ? "action2" : "action1";

    return (
        <InventoryItem
            itemId="hammer"
            height={size.height}
            width={size.width}
            sections={["description", "effect", "action"]}
            extras={{ values: { 
                effect: `${damage} ${t('damage')}`,
                action: t(action),
            }}}
            {...props}
        >
            <HammerVisual />
        </InventoryItem>
    )
}

export default Hammer;
