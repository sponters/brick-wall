import hammerTechnique from './hammerTechnique'
import hashGenerator from './hashGenerator'
import batteryChargeFaster from './batteryChargeFaster'


const upgrades = {
    [hammerTechnique.upgradeId]: hammerTechnique,
    [hashGenerator.upgradeId]: hashGenerator,
    [batteryChargeFaster.upgradeId]: batteryChargeFaster,
};

export default upgrades;
