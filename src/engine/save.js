import pako from 'pako';

import store from 'state/store'
import { time, initialTime } from './time'

import slices from 'state/slices'
import { addTickCallback } from './loop';

export const SAVE_KEY = 'save';

function compressToBase64(source) {
    const compressed = pako.deflate(source, { to: 'string' });
    return btoa(String.fromCharCode(...compressed));
}

function decompressFromBase64(base64) {
    const binary = atob(base64);
    const uint8Array = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      uint8Array[i] = binary.charCodeAt(i);
    }
    return pako.inflate(uint8Array, { to: 'string' });
}

export function saveState() {
    const save = {
        time,
        store: store.getState()
    };
    const stringified = JSON.stringify(save);
    const base64 = compressToBase64(stringified);
    localStorage.setItem(SAVE_KEY, base64);
}

export function loadState() {
    const base64 = localStorage.getItem(SAVE_KEY);
    if (!base64)
        return;
    const stringified = decompressFromBase64(base64)
    const save = JSON.parse(stringified);

    Object.assign(time, save.time);
    for (const [sliceId, slice] of Object.entries(slices))
        store.dispatch(slice.load(save.store[sliceId]));
}

export function resetState() {
    Object.assign(time, initialTime);
    for (const [, slice] of Object.entries(slices))
        store.dispatch(slice.load(slice.initialState));
}

addTickCallback(4, () => {
    if ((time.total % 200) === 0){
        saveState();
    }
});