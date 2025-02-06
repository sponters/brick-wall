import { EletronicTypes } from 'consts';
import hammerTechnique from './hammerTechnique'
import slowerBricks from './slowerBricks'
import hashGenerator from './hashGenerator'
import batteryChargeFaster from './batteryChargeFaster'


const upgrades = {
    [hammerTechnique.id]: hammerTechnique,
    [slowerBricks.id]: slowerBricks,
    [EletronicTypes.controller]: {
        [hashGenerator.id]: hashGenerator,
    },
    [EletronicTypes.battery]: {
        [batteryChargeFaster.id]: batteryChargeFaster
    }
};

export default upgrades;
