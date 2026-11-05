import { PayloadAction } from '@reduxjs/toolkit';
import { AppState, AppStateStatus } from 'react-native';
import { eventChannel, EventChannel, SagaIterator } from 'redux-saga';
import {
  all,
  call,
  fork,
  put,
  select,
  take,
  takeLeading,
} from 'redux-saga/effects';

import {
  authenticateWithBiometrics,
  enableBiometrics,
  getBiometryType,
  getPin,
  hasPin,
  savePin,
} from '@/services/secureStorage';
import {
  authActions,
  PIN_LENGTH,
  selectBiometryType,
  selectHasPin,
} from '../slices/index.ts';
import { BiometryType } from '@/services/secureStorage/types.ts';

const PIN_REGEX = new RegExp(`^\\d{${PIN_LENGTH}}$`);

function* initSaga(): SagaIterator {
  const [pinExists, biometryType]: [boolean, BiometryType] = yield all([
    call(hasPin),
    call(getBiometryType),
  ]);
  yield put(authActions.initialized({ hasPin: pinExists, biometryType }));
}

function* setPinSaga(action: PayloadAction<string>): SagaIterator {
  const pin = action.payload;

  if (!PIN_REGEX.test(pin)) {
    yield put(authActions.setPinFailed(`PIN must be ${PIN_LENGTH} digits`));
    return;
  }

  try {
    yield call(savePin, pin);

    const biometryType: BiometryType = yield select(selectBiometryType);
    if (biometryType) {
      try {
        yield call(enableBiometrics);
      } catch {
        // Biometrics are optional — PIN alone still works
      }
    }

    yield put(authActions.setPinSucceeded());
  } catch {
    yield put(authActions.setPinFailed('Could not save PIN'));
  }
}

function* unlockWithPinSaga(action: PayloadAction<string>): SagaIterator {
  const storedPin: string | null = yield call(getPin);

  if (storedPin !== null && storedPin === action.payload) {
    yield put(authActions.unlocked());
  } else {
    yield put(authActions.unlockFailed('Wrong PIN'));
  }
}

function* unlockWithBiometricsSaga(): SagaIterator {
  const success: boolean = yield call(authenticateWithBiometrics);
  if (success) {
    yield put(authActions.unlocked());
  }
  // on failure/cancel we stay on the Lock screen with the PIN input
}

function createAppStateChannel(): EventChannel<AppStateStatus> {
  return eventChannel(emit => {
    const subscription = AppState.addEventListener('change', emit);
    return () => subscription.remove();
  });
}

function* lockOnBackgroundSaga(): SagaIterator {
  const channel: EventChannel<AppStateStatus> = yield call(
    createAppStateChannel,
  );
  try {
    while (true) {
      const status: AppStateStatus = yield take(channel);
      // 'background' only — 'inactive' also fires while the Face ID prompt is up
      if (status === 'background') {
        const pinExists: boolean = yield select(selectHasPin);
        if (pinExists) {
          yield put(authActions.lock());
        }
      }
    }
  } finally {
    channel.close();
  }
}

export function* authSaga(): SagaIterator {
  // Use `.type` — passing an RTK action creator as a pattern would be
  // treated as a predicate function and match every action
  yield takeLeading(authActions.setPinRequested.type, setPinSaga);
  yield takeLeading(authActions.unlockWithPinRequested.type, unlockWithPinSaga);
  yield takeLeading(
    authActions.unlockWithBiometricsRequested.type,
    unlockWithBiometricsSaga,
  );
  yield fork(lockOnBackgroundSaga);
  yield call(initSaga);
}
