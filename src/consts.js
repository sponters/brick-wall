export function isDev() { return process.env.NODE_ENV === "development";}

export const wallRows = 44;
export const wallCols = 68;


export const jumpStart = isDev() ? true : false;

export const GameStatus = {
    loading: 0,
    resetting: 1,
    running: 2,
};

export const ChargeUpgradeStatus = {
    pending: 0,
    paused: 1,
    charging: 2
};

export const ConnectionTypes = {
    power: "power",
    battery: "battery",
    controller: "controller",
    score: "score",
};

export const BorderTypes = {
    normal: 0,
    hasFunds: 1,
    noFunds: 2
}

