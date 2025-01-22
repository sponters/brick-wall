import ClassicWall4x2 from '../walls/ClassicWall4x2';
import Battery from '../objects/Battery'
import Light from '../objects/Light';
import PowerOutlet from '../objects/PowerOutlet';
import ThinPipe from '../objects/ThinPipe';
import Controller from '../objects/Controller';
import { useRef } from 'react';


function Level1() {
    const levelRef = useRef();

    return (
        <div className="level" ref={levelRef}>
            <ClassicWall4x2 id="l1_w3" batteryId="l1_b1" brickType="clayBrick" layout={0} />
            <ClassicWall4x2 id="l1_w2" batteryId="l1_b1" brickType="clayBrick" layout={1}>
                <ThinPipe top bottom row={24} col={10} height={15} width={1} />
                <ThinPipe top right row={39} col={10} height={1} width={1} />
                <ThinPipe left right row={39} col={11} height={1} width={10} />
                <PowerOutlet id="l1_o1" row={39} col={21} height={1} width={1} />
                <Controller row={10} col={40} />
            </ClassicWall4x2>
            <ClassicWall4x2 id="l1_w1" batteryId="l1_b1" brickType="unburntBrick" layout={0}>
                <Battery id="l1_b1" row={22} col={8} height={2} width={5} />
                <Light id="l1_l1" batteryId="l1_b1" level={levelRef} />
            </ClassicWall4x2>
        </div>
    )
}

export default Level1;
