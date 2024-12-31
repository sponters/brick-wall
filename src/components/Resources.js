import { useSelector } from 'react-redux'

function Resources() {
  const res = useSelector(state => state.res);

  return (
    <div>
      {res.bricks}
    </div>
  );
}

export default Resources;
