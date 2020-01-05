import actionCreatorFactory from 'typescript-fsa';

import { NormalizedRounds } from 'modules/rounds/schemas';
import {
  CreateRoundData,
  FetchRoundParams,
  FetchRoundsParams,
} from 'modules/rounds/types';

const roundsActionCreator = actionCreatorFactory('ROUNDS');

export const fetchRoundAsync = roundsActionCreator.async<
  FetchRoundParams,
  NormalizedRounds,
  Error
>('FETCH');

export const fetchRoundsAsync = roundsActionCreator.async<
  FetchRoundsParams,
  NormalizedRounds,
  Error
>('FETCH_LIST');

export const fetchRoundCancel = roundsActionCreator<FetchRoundParams>(
  'FETCH_CANCEL',
);

export const fetchRoundsCancel = roundsActionCreator<FetchRoundsParams>(
  'FETCH_LIST_CANCEL',
);

export const createRoundAsync = roundsActionCreator.async<
  CreateRoundData,
  NormalizedRounds,
  Error
>('CREATE');

export const createRoundAction = roundsActionCreator<number>('CREATE');
export const createRoundCancel = roundsActionCreator<CreateRoundData>(
  'CREATE_CANCEL',
);

const actions = {
  fetchRoundAsync,
  fetchRoundsAsync,
  fetchRoundCancel,
  createRoundAsync,
  createRoundCancel,
};

export default actions;
