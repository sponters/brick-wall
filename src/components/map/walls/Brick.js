import React, { useContext } from 'react';
import { useSelector } from 'react-redux'
import { hit } from 'engine/brick'
import * as images from 'img'
import { selectBrick } from 'state/slices/levelsSlice';
import WallObject from '../WallObject';
import { LevelContext } from '../Level';

function Brick({ levelId, brickId, type, disabled = false, ...props }) {
    const { effectRef } = useContext(LevelContext);

    const brickInfo = useSelector(state => selectBrick(state, levelId, brickId)?.info);

    // Discard render when without state
    if (!brickInfo)
        return null;

    if (brickInfo.health === 0)
        return null;

    const crackValue = brickInfo.health / brickInfo.maxHealth;
    const cracked1 = (crackValue < 0.67) ? brickInfo.cracked1 : 0;
    const cracked2 = (crackValue < 0.34) ? brickInfo.cracked2 : 0;
    const cracked1Img = `cracked${cracked1}`;
    const cracked2Img = `cracked${cracked2}`;

    const onGameHit = (event) => {
        hit(levelId, brickId, event, effectRef);
    };

    return (
        <WallObject
            {...props}
            className='brick'
            data-obj-type="brick"
            dir="ltr"
            ref={(el) => {
                if (!disabled && (el !== null))
                    el.addEventListener("gameHitEvent", onGameHit);
                return () => {
                    if (!disabled && (el !== null))
                        el.removeEventListener("gameHitEvent", onGameHit);
                }
            }}
        >
            <div
                className="brick-image"
                style={{
                    backgroundImage: `url(${images[type]})`
                }}
            />
            {cracked1 > 0 &&
                <div
                    className="brick-cracked"
                    style={{
                        backgroundImage: `url(${images[cracked1Img]})`
                    }}
                />
            }
            {cracked2 > 0 &&
                <div
                    className="brick-cracked"
                    style={{
                        backgroundImage: `url(${images[cracked2Img]})`
                    }}
                />
            }
        </WallObject>
    );
}

export default Brick;
