import { SagaIterator } from 'redux-saga';
import { all, fork } from 'redux-saga/effects';

import { authSaga } from '@/store/auth/sagas';

export function* rootSaga(): SagaIterator {
  yield all([fork(authSaga)]);
}
