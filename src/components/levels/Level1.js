import { useSelector } from 'react-redux';

import ClassicWall4x2 from '../walls/ClassicWall4x2';
import Battery from '../Battery'
import Light from '../Light';
import PowerOutlet from '../PowerOutlet';
import ThinPipe from '../ThinPipe';


function Level1() {
    const lightStatus = useSelector(state => state.eletronics.l1_l1?.status);

    const style = {
        visibility: lightStatus ? 'visible' : 'hidden'
    };

    return (
        <div className="level" style={style}>
            <ClassicWall4x2 id="l1_w3" brickType="clayBrick" layout={0} />
            <ClassicWall4x2 id="l1_w2" brickType="clayBrick" layout={1}>
                <ThinPipe top bottom row={24} col={10} height={15} width={1} />
                <ThinPipe top right row={39} col={10} height={1} width={1} />
                <ThinPipe left right row={39} col={11} height={1} width={10} />
                <PowerOutlet id="l1_o1" row={39} col={21} height={1} width={1} />
            </ClassicWall4x2>
            <ClassicWall4x2 id="l1_w1" brickType="unburntBrick" layout={0}>
                <Battery id="l1_b1" row={22} col={8} height={2} width={5} />
                <Light id="l1_l1" batteryId="l1_b1" />
            </ClassicWall4x2>
        </div>
    )
}

export default Level1;
