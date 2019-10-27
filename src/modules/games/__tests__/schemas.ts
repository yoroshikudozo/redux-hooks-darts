import * as schemas from '../schemas';
import game1 from '../mock/resources/game1';
import game2 from '../mock/resources/game2';
import game3 from '../mock/resources/game3';
import user1 from 'modules/users/mock/resources/user1';
import user2 from 'modules/users/mock/resources/user2';
import user3 from 'modules/users/mock/resources/user3';

describe('gameSchema', () => {
  it('returns normalized entity', async () => {
    const data = game1;
    const normalizedData = schemas.gameNormalize(data);

    expect(normalizedData).toEqual({
      entities: {
        games: { '1': { ...game1, players: ['1'] } },
        players: { 1: user1 },
      },
      result: { games: ['1'] },
    });
  });
});

describe('gameListSchema', () => {
  it('returns normalized entity', async () => {
    const data = { games: [game1, game2, game3] };
    const normalizedData = schemas.gamesNormalize(data);

    expect(normalizedData).toEqual({
      entities: {
        games: {
          '1': { ...game1, players: ['1'] },
          '2': { ...game2, players: ['2'] },
          '3': { ...game3, players: ['3'] },
        },
        players: {
          1: user1,
          2: user2,
          3: user3,
        },
      },
      result: { games: ['1', '2', '3'] },
    });
  });
});
