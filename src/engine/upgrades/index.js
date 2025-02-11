import hammerTechnique from './hammerTechnique'
import hashGenerator from './hashGenerator'
import batteryChargeFaster from './batteryChargeFaster'
import batteryStats from './batteryStats'


const upgrades = {
    [hammerTechnique.upgradeId]: hammerTechnique,
    [hashGenerator.upgradeId]: hashGenerator,
    [batteryChargeFaster.upgradeId]: batteryChargeFaster,
    [batteryStats.upgradeId]: batteryStats,
};

export default upgrades;
