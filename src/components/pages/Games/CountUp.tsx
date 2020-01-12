import React, { useCallback, useState } from 'react';

import Helmet from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import config from 'config';
import CONSTS from 'consts';

import Button from '@material-ui/core/Button';

import { AppState } from 'modules/reducers';

import { Dartsboard } from 'components/atoms/DartsBoard';
import QuittingModal from 'components/organisms/QuittingModal';
import { createDart } from 'modules/darts/operations';
import { DartsBoardData } from 'modules/darts/types';
import { getGameBySlug } from 'modules/games/selectors';
import { getPlayers } from 'modules/users/selectors';

export default function CountUp() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { slug } = useParams<{ slug: string }>();

  const players = useSelector(getPlayers);

  const game = useSelector((state: AppState) => getGameBySlug(state, slug));

  console.log(game);

  if (!game) {
    history.push(`${CONSTS.ROUTES.GAMES.ROOT}`);
  }

  const [isQuitting, setQuitting] = useState(false);

  const handleQuit = () => setQuitting(true);

  const handleConfirm = useCallback(() => {
    dispatch({ type: 'ABORT_GAME', payload: { name: 'countUp' } });
    history.push(CONSTS.ROUTES.GAMES.ROOT);
  }, [dispatch, history]);

  const handleCancel = useCallback(() => setQuitting(false), []);

  const handleBoardClick = ({
    currentTarget: {
      dataset: { value, area, type },
    },
  }: React.MouseEvent<SVGElement>) => {
    console.log(value);
    console.log(area);
    console.log(type);
    createDart({ value: Number(value), area, type } as DartsBoardData);
  };

  return (
    <>
      <Helmet title="Count Up" />

      <Button color="primary" variant="outlined" onClick={handleQuit}>
        Back
      </Button>

      <h1>Count Up</h1>
      <h2>asdf</h2>

      <Dartsboard onBoardClick={handleBoardClick} isFinished={false} />

      <QuittingModal
        name={config.games.countUp.name}
        open={isQuitting}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
      />
    </>
  );
}
