import React from 'react';
import { LevelContext } from '../Level';
import { useContext } from 'react';
import WallObject from '../WallObject';

function ThinPipe({ left = false, right = false, top = false, bottom = false, ...props }) {
    const { front } = useContext(LevelContext);

    const localLeft = front ? left : right;
    const localRight = front ? right : left;

    const straight = (left && right) !== (top && bottom);

    const thickness = straight ? "30%" : "50%";
    const offset = straight ? "35%" : "25%";
    const length = straight ? "65%" : "75%";

    return (
        <WallObject {...props} className="thin-pipe">
            {localLeft &&
                <div className="pipe"
                    style={{
                        height: thickness,
                        width: length,
                        top: offset,
                        left: 0,
                    }}
                />
            }
            {localRight &&
                <div className="pipe"
                    style={{
                        height: thickness,
                        width: length,
                        top: offset,
                        right: 0,
                    }}
                />
            }
            {top &&
                <div className="pipe"
                    style={{
                        height: length,
                        width: thickness,
                        top: 0,
                        left: offset,
                    }}
                />
            }
            {bottom &&
                <div className="pipe"
                    style={{
                        height: length,
                        width: thickness,
                        bottom: 0,
                        left: offset,
                    }}
                />
            }
        </WallObject>
    )
}

export default ThinPipe;
