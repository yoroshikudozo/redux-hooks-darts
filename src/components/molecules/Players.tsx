import React from 'react';
import { User } from 'modules/users/types';

interface Props {
  players: User[];
}

export default function Players({ players }: Props) {
  return (
    players && (
      <ul>
        {players.map((player: User, index: number) => (
          <li key={index}>
            {Object.keys(player).map((key, index2: number) => (
              <dl key={`${index}-${index2}`}>
                <dt>{key} :</dt>
                <dd>{player[key as keyof typeof player]}</dd>
              </dl>
            ))}
          </li>
        ))}
      </ul>
    )
  );
}
