import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import CONSTS from 'consts';

import { Dartsboard } from 'components/atoms/DartsBoard';
import {
  fetchDartsByGameAsync,
  fetchDartsByGameCancel,
} from 'modules/darts/actions';

function Home() {
  const handleClick = ({ currentTarget }: React.MouseEvent<SVGElement>) => {
    console.log(currentTarget.dataset.value);
    console.log(currentTarget.dataset.area);
    console.log(currentTarget.dataset.type);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDartsByGameAsync.started({ gameId: '1' }));
    return () => {
      dispatch(fetchDartsByGameCancel({ gameId: '2' }));
    };
  }, [dispatch]);

  return (
    <div>
      <div>Home</div>
      <Link to={CONSTS.ROUTES.USERS.ROOT}>Users</Link>
      <Link to={CONSTS.ROUTES.GAMES.ROOT}>Games</Link>
      <Dartsboard onBoardClick={handleClick} isFinished={false} />
    </div>
  );
}

export default Home;
