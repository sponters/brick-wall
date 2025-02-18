import React from 'react';

function Controller({ version }) {
    const extraClass = (version === 2) ? " controller-screen-v2" : "";
    return (
        <div className="tech-black-frame">
            <div className={`controller-screen${extraClass}`}>
                ≡≡<br />▒▒
            </div>
        </div>
    )
};

const size = {
    width: 2,
    height: 3
};

export { size };

export default Controller;
