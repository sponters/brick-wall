import ProgressBar from 'components/improvements/ProgressBar';
import Tooltip from 'components/Tooltip';
import { selectBrickBonus, selectComboMult } from 'engine/score';
import useTooltipConfig from 'hooks/useTolltipConfig';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux'
import { scoreLevelProgression, selectScore } from 'state/slices/inventorySlice';


function Score() {
    const { t: tCont } = useTranslation(null, { keyPrefix: "inventory.containers.score" });
    const { t } = useTranslation(null, { keyPrefix: "inventory.score" });

    const score = useSelector(state => selectScore(state));
    const bonus = useSelector(state => selectBrickBonus(state));
    const bonusMult = selectComboMult(score);

    const scoreRef = useRef();
    const showTooltip = useTooltipConfig(scoreRef);

    if (score.total <= 0)
        return null;

    const previous = (score.info.level === 0) ? 0 : scoreLevelProgression[score.info.level - 1];
    const next = scoreLevelProgression[score.info.level];
    const progress = (score.total - previous) / (next - previous);

    return (
        <div className="inventory-container">
            <div className="header">{tCont("title")}</div>
            <ProgressBar title={`${score.total} (${score.info.level})`} progress={progress} ref={scoreRef} />
            {score.info.comboUnlocked &&
                <ProgressBar
                    title={`Hits ${score.info.combo.hits} / ${score.info.combo.max} (bonus x${bonusMult})`}
                    progress={score.info.combo.hits / score.info.combo.max}
                />
            }
            {score.info.comboUnlocked &&
                <div>Bonus (bricks): +{bonus}</div>
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
