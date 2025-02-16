import hammerTechnique from './hammerTechnique'
import fasterAutoHammer from './fasterAutoHammer'

import brickInstaKill from './brickInstaKill'

import hashGenerator from './hashGenerator'
import hashGeneratorSpeed from './hashGeneratorSpeed'
import autoHashGenerator from './autoHashGenerator'

import batteryChargeFaster from './batteryChargeFaster'
import batteryMaxCapacity from './batteryMaxCapacity'
import batteryStats from './batteryStats'

const upgrades = {
    [hammerTechnique.upgradeId]: hammerTechnique,
    [fasterAutoHammer.upgradeId]: fasterAutoHammer,

    [brickInstaKill.upgradeId]: brickInstaKill,

    [hashGenerator.upgradeId]: hashGenerator,
    [hashGeneratorSpeed.upgradeId]: hashGeneratorSpeed,
    [autoHashGenerator.upgradeId]: autoHashGenerator,

    [batteryChargeFaster.upgradeId]: batteryChargeFaster,
    [batteryMaxCapacity.upgradeId]: batteryMaxCapacity,
    [batteryStats.upgradeId]: batteryStats,
};

export default upgrades;
