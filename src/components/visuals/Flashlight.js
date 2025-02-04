import React from 'react';
import { flashlight } from 'img'

function Flashlight() {
    return (
        <div
            className="image-visual"
            style={{ backgroundImage: `url(${flashlight})` }}
        />
    )
};

const size = {
    width: 3,
    height: 1
};

export { size };

export default Flashlight;
