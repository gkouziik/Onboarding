import { RootState } from '@/store';

export const selectAuth = (state: RootState) => state.auth;
export const selectHasPin = (state: RootState) => state.auth.hasPin;
export const selectBiometryType = (state: RootState) => state.auth.biometryType;
