import { combineEpics } from 'redux-observable';
import { loggingEpic } from 'modules/common/utils/rx';
import dartsEpic from 'modules/darts/epics';

export const rootEpic = combineEpics(dartsEpic, loggingEpic);
