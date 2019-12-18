import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Dartsboard } from 'components/atoms/DartsBoard';
import { fetchDartsByGameCancel, fetchDart } from 'modules/darts/actions';
import Players from 'components/molecules/Players';

function Home() {
  const handleClick = ({ currentTarget }: React.MouseEvent<SVGElement>) => {
    console.log(currentTarget.dataset.value);
    console.log(currentTarget.dataset.area);
    console.log(currentTarget.dataset.type);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDart('1'));
    return () => {
      dispatch(fetchDartsByGameCancel({ gameId: '2' }));
    };
  }, [dispatch]);

  return (
    <div>
      <div>Home</div>
      <Dartsboard onBoardClick={handleClick} isFinished={false} />
    </div>
  );
}

export default Home;
