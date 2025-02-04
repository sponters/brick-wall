import hammerTechnique from './hammerTechnique'
import slowerBricks from './slowerBricks'
import hashGenerator from './hashGenerator'

const upgrades = {
    [hammerTechnique.id]: hammerTechnique,
    [slowerBricks.id]: slowerBricks,
    [hashGenerator.id]: hashGenerator,
};

export default upgrades;
