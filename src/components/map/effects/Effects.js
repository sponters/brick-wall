import React, { useContext, useRef, useState } from "react";
import * as images from 'img'

import { LevelContext } from '../Level';
import { useTranslation } from "react-i18next";


function BrickHitEffect({ left, top, rotation }) {
    return (
        <img
            alt="Pow!"
            className="brick-hit unselectable"
            src={images.hit}
            style={{
                transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                left: `${left}px`,
                top: `${top}px`,
            }}
        />
    );
}

function BrickAlmostHitEffect({ left, top }) {
    const { t } = useTranslation(null, { keyPrefix: `effects` });
    return (
        <div
            className="brick-almost-hit unselectable"
            style={{
                left: `${left}px`,
                top: `${top}px`,
            }}
        >
            {t("almostHit")}
        </div>
    );

}

function AddScoreEffect({ left, top, value }) {
    return (
        <div
            className="score-gain unselectable"
            style={{
                left: `${left}px`,
                top: `${top}px`,
            }}
        >
            +{value}
        </div>
    );

}

function createEffectCalls(containerRef, createEffect) {
    return {
        addBrickHitEffect: (event) => {
            const parentRect = containerRef.current.parentNode.getBoundingClientRect();
            createEffect(BrickHitEffect, {
                left: event.clientX - parentRect.x,
                top: event.clientY - parentRect.y,
                rotation: Math.floor(Math.random() * 0)
            }, 150);
        },
        addBrickAlmostHit: (event) => {
            const parentRect = containerRef.current.parentNode.getBoundingClientRect();
            createEffect(BrickAlmostHitEffect, {
                left: event.clientX - parentRect.x,
                top: event.clientY - parentRect.y,
            }, 400);
        },
        addScoreEffect: (event, value) => {
            const parentRect = containerRef.current.parentNode.getBoundingClientRect();
            createEffect(AddScoreEffect, {
                left: event.clientX - parentRect.x,
                top: event.clientY - parentRect.y,
                value
            }, 400);
        }
    };
}

function Effects() {
    const { effectRef } = useContext(LevelContext);
    const [, setLastId] = useState(0);

    const containerRef = useRef();
    const effects = useRef({});
    const nextId = useRef((() => {
        let id = 1;
        return () => {
            id = (id + 1) % 10000;
            return id;
        }
    })());

    const createEffect = (component, data, timeout) => {
        const id = nextId.current();
        effects.current[id] = [component, data];
        setTimeout(() => {
            delete effects.current[id];
            setLastId(-id);
        }, timeout);
        setLastId(id);
    }

    effectRef.current = createEffectCalls(containerRef, createEffect);

    return (
        <div className="effects" ref={containerRef} >
            {Object.keys(effects.current).map(id => {
                const [Component, props] = effects.current[id];
                return <Component
                    key={id}
                    {...props}
                />
            })}
        </div>
    )
}

export default Effects;
