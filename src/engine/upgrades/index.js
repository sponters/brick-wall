import hammerTechnique from './hammerTechnique'
import hashGenerator from './hashGenerator'
import hashGeneratorSpeed from './hashGeneratorSpeed'
import batteryChargeFaster from './batteryChargeFaster'
import batteryStats from './batteryStats'



const upgrades = {
    [hammerTechnique.upgradeId]: hammerTechnique,
    [hashGenerator.upgradeId]: hashGenerator,
    [hashGeneratorSpeed.upgradeId]: hashGeneratorSpeed,
    [batteryChargeFaster.upgradeId]: batteryChargeFaster,
    [batteryStats.upgradeId]: batteryStats,
};

export default upgrades;
