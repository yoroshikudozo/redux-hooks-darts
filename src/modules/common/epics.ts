import { combineEpics } from 'redux-observable';
import { loggingEpic } from 'modules/common/utils/rx';
import { fetchDartsEpic } from 'modules/darts/epics';

export const rootEpic = combineEpics(fetchDartsEpic, loggingEpic);
