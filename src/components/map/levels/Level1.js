import React from 'react';
import ClassicWall4x2 from '../walls/ClassicWall4x2';
import Battery from '../objects/Battery'
import Light from '../objects/Light';
import PowerOutlet from '../objects/PowerOutlet';
import ThinPipe from '../objects/ThinPipe';
import Controller from '../objects/Controller';
import Flashlight from '../objects/Flashlight';
import { useRef } from 'react';
import Level from '../Level';


function Level1({ front = true }) {
    const levelRef = useRef();

    return (
        <Level
            levelRef={levelRef}
            front={front}
            light={<Light objId="l1_l1" batteryId="l1_b1" level={levelRef} global />}
        >
            <ClassicWall4x2 wallId="l1_w3" batteryId="l1_b1" brickType="clayBrick" layout={0} />

            <ClassicWall4x2 wallId="l1_w2" batteryId="l1_b1" brickType="clayBrick" layout={1} />

            <ThinPipe top bottom row={24} col={10} height={15} width={1} />
            <ThinPipe top right row={39} col={10} height={1} width={1} />
            <ThinPipe left right row={39} col={11} height={1} width={10} />
            <PowerOutlet objId="l1_o1" batteryId="l1_b1" port="●" row={39} col={21} height={1} width={1} />
            <Flashlight row={10} col={10} style={{ transform: `rotate(${front ? "" : "-"}30deg)` }} />
            <Controller row={10} col={40} style={{ transform: `rotate(${front ? "" : "-"}30deg)` }} />

            <ClassicWall4x2 wallId="l1_w1" batteryId="l1_b1" brickType="unburntBrick" layout={0} />
            <Battery objId="l1_b1" row={22} col={8} height={2} width={5} front />

        </Level>
    )
}

export default Level1;
