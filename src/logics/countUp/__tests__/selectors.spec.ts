import { AppState } from 'modules/reducers';

import * as selectors from 'logics/countUp/selectors';

describe('darts selectors', () => {
  const state = {
    ui: {
      countUp: {
        currentGame: '1',
        currentRound: '2',
        currentScore: '3',
      },
    },
  };

  describe('getCountUp', () => {
    it('selects collectly', () => {
      expect(selectors.getCountUp((state as unknown) as AppState)).toEqual(
        state.ui.countUp,
      );
    });

    it('has same refference', () => {
      const data = selectors.getCountUp((state as unknown) as AppState);
      const data2 = selectors.getCountUp((state as unknown) as AppState);
      expect(data).toBe(data2);
    });
  });

  describe('currentGame', () => {
    it('selects collectly', () => {
      expect(
        selectors.getCurrentGameId((state as unknown) as AppState),
      ).toEqual(state.ui.countUp.currentGame);
    });

    it('has same refference', () => {
      const data = selectors.getCurrentGameId((state as unknown) as AppState);
      const data2 = selectors.getCurrentGameId((state as unknown) as AppState);
      expect(data).toBe(data2);
    });
  });

  describe('currentScore', () => {
    it('selects collectly', () => {
      expect(
        selectors.getCurrentScoreId((state as unknown) as AppState),
      ).toEqual(state.ui.countUp.currentScore);
    });

    it('has same refference', () => {
      const data = selectors.getCurrentScoreId((state as unknown) as AppState);
      const data2 = selectors.getCurrentScoreId((state as unknown) as AppState);
      expect(data).toBe(data2);
    });
  });

  describe('currentRound', () => {
    it('selects collectly', () => {
      expect(
        selectors.getCurrentRoundId((state as unknown) as AppState),
      ).toEqual(state.ui.countUp.currentRound);
    });

    it('has same refference', () => {
      const data = selectors.getCurrentRoundId((state as unknown) as AppState);
      const data2 = selectors.getCurrentRoundId((state as unknown) as AppState);
      expect(data).toBe(data2);
    });
  });
});
