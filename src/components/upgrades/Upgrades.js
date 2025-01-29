import { useSelector } from 'react-redux';
import Upgrade from './Upgrade'

function Upgrades() {
    const unlocked = useSelector(state => {
        return state.upgrades.tabUnlocked
    });

    return (
        <div className="upgrades-container">
            {unlocked && <div className="header">Upgrades</div>}
            <Upgrade id="hammerTechnique" />
        </div>
    )
}

export default Upgrades;
