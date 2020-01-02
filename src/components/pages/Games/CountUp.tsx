import React, { useCallback, useState } from 'react';

import Helmet from 'react-helmet';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import config from 'config';
import CONSTS from 'consts';

import Button from '@material-ui/core/Button';

import QuittingModal from 'components/organisms/QuittingModal';

export default function CountUp() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isQuitting, setQuitting] = useState(false);

  const handleQuit = () => setQuitting(true);

  const handleConfirm = useCallback(() => {
    dispatch({ type: 'ABORT_GAME', payload: { name: 'countup' } });
    history.push(CONSTS.ROUTES.GAMES.ROOT);
  }, [dispatch, history]);

  const handleCancel = useCallback(() => setQuitting(false), []);

  return (
    <>
      <Helmet title="Count Up" />

      <Button color="primary" variant="outlined" onClick={handleQuit}>
        Back
      </Button>

      <h1>Count Up</h1>
      <h2>asdf</h2>

      <QuittingModal
        name={config.games.countUp.name}
        open={isQuitting}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
      />
    </>
  );
}
