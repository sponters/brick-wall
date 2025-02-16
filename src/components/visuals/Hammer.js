import React from 'react';
import { hammer } from 'img'

function Hammer() {
    return (
        <div
            className="image-visual"
            style={{ backgroundImage: `url(${hammer})` }}
        />
    )
};

const size = {
    width: 2,
    height: 3
};

export { size };

export default Hammer;
