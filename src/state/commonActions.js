export function commonAdd(state, payload) {
    if (typeof payload !== 'object')
        throw Error('Invalid payload in commonAdd');

    for (const [key, value] of Object.entries(payload)) {
        if (typeof value !== 'object') {
            state[key] += value;
            continue;
        }
        commonAdd(state[key], value);
    }
}

export function commonSet(state, payload) {
    if (typeof payload !== 'object')
        throw Error('Invalid payload in commonAdd');

    for (const [key, value] of Object.entries(payload)) {
        if (typeof value !== 'object') {
            state[key] = value;
            continue;
        }
        commonSet(state[key], value);
    }
}
