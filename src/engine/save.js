import pako from 'pako';

import store from '../redux/store'
import { state, initialState } from './state'

import { load as loadRes, initialState as initialStateRes } from '../redux/resSlice'
import { load as loadWall, initialState as initialStateWall } from '../redux/wallSlice'

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
    console.log('Saving...');
    const save = {
        state,
        store: store.getState()
    };
    console.log(save);
    const stringified = JSON.stringify(save);
    const base64 = compressToBase64(stringified);
    localStorage.setItem(SAVE_KEY, base64);
}

export function loadState() {
    console.log('Loading...');
    const base64 = localStorage.getItem(SAVE_KEY);
    const stringified = decompressFromBase64(base64)
    const save = JSON.parse(stringified);

    Object.assign(state, save.state);

    store.dispatch(loadRes(save.store.res));
    store.dispatch(loadWall(save.store.wall));
}

export function resetState() {
    Object.assign(state, initialState);
    store.dispatch(loadRes(initialStateRes));
    store.dispatch(loadWall(initialStateWall));
}

export function tick() {
    if ((state.time.total % 200) === 0){
        saveState();
    }
}