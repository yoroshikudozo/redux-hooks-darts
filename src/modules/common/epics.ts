import { combineEpics } from 'redux-observable';

import dartsEpic from 'modules/darts/epics';
import usersEpic from 'modules/users/epics';

import { loggingEpic } from 'modules/common/utils/rx';

export const rootEpic = combineEpics(dartsEpic, usersEpic, loggingEpic);
