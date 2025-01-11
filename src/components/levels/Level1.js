import ClassicWall4x2 from '../walls/ClassicWall4x2';
import Battery from '../Battery'
import { useSelector } from 'react-redux';
import Light from '../Light';

function Level1() {
    const lightStatus = useSelector(state => state.eletronics.lights.l1.status);

    const style = {
        visibility: lightStatus ? 'visible' : 'hidden'
    };

    return (
        <div className="level" style={style}>
            <ClassicWall4x2 layer={1} brickType="clayBrick" layout={0} />
            <ClassicWall4x2 layer={2} brickType="clayBrick" layout={1} />
            <ClassicWall4x2 layer={3} brickType="clayBrick" layout={0}>
                <Light />
                <Battery id="b3" row={20} col={20} height={2} width={5} />
            </ClassicWall4x2>
        </div>
    )
}

export default Level1;
