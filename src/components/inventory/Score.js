import ProgressBar from 'components/improvements/ProgressBar';
import Tooltip from 'components/Tooltip';
import { ConnectionTypes } from 'consts';
import { selectBrickBonus, selectComboMult } from 'engine/score';
import useTooltipConfig from 'hooks/useTolltipConfig';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux'
import { connect, disconnect, selectConnected } from 'state/slices/improvementsSlice';
import { scoreLevelProgression, selectScore } from 'state/slices/inventorySlice';


function Score() {
    const { t: tCont } = useTranslation(null, { keyPrefix: "inventory.containers.score" });
    const { t } = useTranslation(null, { keyPrefix: "inventory.score" });

    const dispatch = useDispatch();
    const connected = useSelector(state => selectConnected(state, "score", "◘"));

    const score = useSelector(state => selectScore(state));
    const bonus = useSelector(state => selectBrickBonus(state));
    const bonusMult = selectComboMult(score);

    const scoreRef = useRef();
    const showTooltip = useTooltipConfig(scoreRef);

    if (score.total <= 0)
        return null;

    const handlePortClick = () => {
        if (connected)
            dispatch(disconnect("score"));
        else
            dispatch(connect({ levelId: "global", objId: "score", port: "◘", type: ConnectionTypes.score }));
    }

    const previous = (score.info.level === 0) ? 0 : scoreLevelProgression[score.info.level - 1];
    const next = scoreLevelProgression[score.info.level];
    const progress = (score.total - previous) / (next - previous);

    return (
        <div className="inventory-container">
            <div className="header">
                {tCont("title")} <span className="port" onClick={handlePortClick}>◘</span>
            </div>
            <ProgressBar title={`${score.total} (${score.info.level})`} progress={progress} ref={scoreRef} />
            {score.info.brickBonusUnlocked &&
                <div>Brick bonus: +{bonus}</div>
            }
            {score.info.comboUnlocked &&
                <ProgressBar
                    title={`Combo ${score.info.combo.hits} / ${score.info.combo.max} (score x${bonusMult})`}
                    progress={score.info.combo.hits / score.info.combo.max}
                />
            }
            {showTooltip &&
                <Tooltip
                    sections={["next_level"]}
                    ownerRef={scoreRef}
                    extras={{ values: { "next_level": t(`levels.${score.info.level}`) } }}
                />
            }
        </div>
    );
}

export default Score;
