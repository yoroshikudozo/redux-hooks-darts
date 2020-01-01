import React from 'react';

import { Link } from 'react-router-dom';

import config from 'config';
import CONSTS from 'consts';

export default function Games() {
  return (
    <div>
      <h1>Select Games</h1>
      <Link to={CONSTS.ROUTES.HOME}>Home</Link>
      <ul>
        {config.games.map(game => (
          <li key={game.key}>
            <Link to={CONSTS.ROUTES.GAMES[game.key]}>{game.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
