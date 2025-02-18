import hammerTechnique from './hammerTechnique'
import fasterAutoHammer from './fasterAutoHammer'

import brickInstaKill from './brickInstaKill'

import hashGenerator from './hashGenerator'
import hashGeneratorSpeed from './hashGeneratorSpeed'
import hashGeneratorSpeedV2 from './hashGeneratorSpeedV2'
import rainbowGenerator from './rainbowGenerator'
import autoHashGenerator from './autoHashGenerator'

import batteryChargeFaster from './batteryChargeFaster'
import batteryMaxCapacity from './batteryMaxCapacity'
import batteryStats from './batteryStats'

import scoreMaxCombo from './scoreMaxCombo'
import scoreMoreBrickBonus from './scoreMoreBrickBonus'

import controllerUpgrade from './controllerUpgrade'

const upgrades = {
    [hammerTechnique.upgradeId]: hammerTechnique,
    [fasterAutoHammer.upgradeId]: fasterAutoHammer,

    [brickInstaKill.upgradeId]: brickInstaKill,

    [hashGenerator.upgradeId]: hashGenerator,
    [hashGeneratorSpeed.upgradeId]: hashGeneratorSpeed,
    [hashGeneratorSpeedV2.upgradeId]: hashGeneratorSpeedV2,
    [autoHashGenerator.upgradeId]: autoHashGenerator,
    [rainbowGenerator.upgradeId]: rainbowGenerator,

    [batteryChargeFaster.upgradeId]: batteryChargeFaster,
    [batteryMaxCapacity.upgradeId]: batteryMaxCapacity,
    [batteryStats.upgradeId]: batteryStats,

    [scoreMaxCombo.upgradeId]: scoreMaxCombo,
    [scoreMoreBrickBonus.upgradeId]: scoreMoreBrickBonus,

    [controllerUpgrade.upgradeId]: controllerUpgrade,
};

export default upgrades;
