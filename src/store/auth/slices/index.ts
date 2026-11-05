import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '@/store';
import { BiometryType } from '@/services/secureStorage/types.ts';

export const PIN_LENGTH = 4;

type AuthState = {
  initialized: boolean;
  hasPin: boolean;
  isLocked: boolean;
  biometryType: BiometryType;
  savingPin: boolean;
  error: string | null;
};

const initialState: AuthState = {
  initialized: false,
  hasPin: false,
  isLocked: false,
  biometryType: null,
  savingPin: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initialized(
      state,
      action: PayloadAction<{ hasPin: boolean; biometryType: BiometryType }>,
    ) {
      state.initialized = true;
      state.hasPin = action.payload.hasPin;
      state.biometryType = action.payload.biometryType;
      state.isLocked = action.payload.hasPin; // locked on cold start
    },

    // Set PIN (handled by saga)
    setPinRequested(state, _action: PayloadAction<string>) {
      state.savingPin = true;
      state.error = null;
    },
    setPinSucceeded(state) {
      state.savingPin = false;
      state.hasPin = true;
    },
    setPinFailed(state, action: PayloadAction<string>) {
      state.savingPin = false;
      state.error = action.payload;
    },

    // Unlock (handled by saga)
    unlockWithPinRequested(state, _action: PayloadAction<string>) {
      state.error = null;
    },
    unlockWithBiometricsRequested() {},
    unlocked(state) {
      state.isLocked = false;
      state.error = null;
    },
    unlockFailed(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },

    lock(state) {
      if (state.hasPin) {
        state.isLocked = true;
      }
    },
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
