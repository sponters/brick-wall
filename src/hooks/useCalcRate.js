import { useCallback, useRef, useState } from 'react';
import useTick from './useTick';
import { speedTicksToSeconds } from 'engine/time';
import store from 'state/store';

function useCalcRate(selectRate) {
    const rates = useRef([]);
    const [rate, setRate] = useState(undefined);

    useTick(4, useCallback(() => {
        const currentRate = selectRate(store.getState());
        if (rates.current.push(currentRate) > 10) {
            rates.current.shift();
            let total = 0;
            for(let i = 1; i < rates.current.length; i++)
                total += rates.current[i] - rates.current[i-1];
            const rate = total / (rates.current.length - 1);
            setRate(rate);
        }
    }, [selectRate, rates]));

    if (rate === undefined)
        return undefined;
    return Math.round(speedTicksToSeconds(rate));
}

export default useCalcRate;