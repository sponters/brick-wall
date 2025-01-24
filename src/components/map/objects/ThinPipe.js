import { LevelContext } from '../Level';
import { useContext } from 'react';

function ThinPipe({ left = false, right = false, top = false, bottom = false, row, col, height, width }) {
    const front = useContext(LevelContext);

    const localLeft = front ? left : right;
    const localRight = front ? right : left;

    const placementStyle = {
        gridRow: `${row} / ${row + height}`,
        gridColumn: `${col} / ${col + width}`,
    }

    const straight = (left && right) !== (top && bottom);

    const thickness = straight ? "30%" : "50%";
    const offset = straight ? "35%" : "25%";
    const length = straight ? "65%" : "75%";

    return (
        <div className="thin-pipe" style={placementStyle}>
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
        </div>
    )
}

export default ThinPipe;
