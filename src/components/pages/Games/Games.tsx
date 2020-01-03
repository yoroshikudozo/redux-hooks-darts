import React from 'react';

import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import cuid from 'cuid';

import config, { GameConfig } from 'config';
import CONSTS from 'consts';

import Button from '@material-ui/core/Button';

import { createGame } from 'modules/games/operations';

export default function Games() {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleGameLinkClick = (game: GameConfig) => {
    console.log('handleGameLinkClick');
    const slug = cuid.slug();
    dispatch(createGame(slug, game.identifier));
    history.push(`${CONSTS.ROUTES.GAMES[game.key]}/${slug}`);
  };

  return (
    <div>
      <h1>Select Games</h1>
      <Link to={CONSTS.ROUTES.HOME}>Home</Link>
      <ul>
        {Object.keys(config.games).map((name, index) => {
          const game = config.games[name as keyof typeof config.games];
          return (
            <li key={index}>
              <Button onClick={() => handleGameLinkClick(game)}>
                {game.name}
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
