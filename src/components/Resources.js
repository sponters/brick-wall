import { useSelector } from 'react-redux'

function Resources() {
  const bricks = useSelector(state => state.res.brick.cur);

  return (
    <div>
      Bricks: {bricks}
    </div>
  );
}

export default Resources;
