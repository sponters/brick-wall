import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux'

function Resources() {
  const { t } = useTranslation(null, { keyPrefix: `res`});

  const brick = useSelector(state => state.res.brick.unlocked ? state.res.brick.cur : -1);

  return (
    <div>
      {brick >= 0 ? (<div>{t('brick.name')}: {brick}</div>) : ""}
    </div>
  );
}

export default Resources;
