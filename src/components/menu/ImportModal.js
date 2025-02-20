import { importState } from 'engine/save';
import React, { useRef } from 'react';

function ImportModal({ onClose }) {
    const textRef = useRef();

    const handleClick = () => {
        const json = textRef.current.value;
        importState(json);
        onClose();
    } 

    return (
        <div>
            <textarea ref={textRef}></textarea>
            <button onClick={handleClick}>OK</button>
        </div>
    )
}

export default ImportModal;
