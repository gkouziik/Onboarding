import * as Keychain from 'react-native-keychain';

import { BiometryType } from '@/services/secureStorage/types.ts';

const PIN_SERVICE = 'onboarding.pin';
const BIOMETRIC_SERVICE = 'onboarding.biometric';

export async function savePin(pin: string): Promise<void> {
  await Keychain.setGenericPassword('pin', pin, {
    service: PIN_SERVICE,
    // never synced to iCloud / restored to another device
    accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
  });
}

export async function getPin(): Promise<string | null> {
  const credentials = await Keychain.getGenericPassword({
    service: PIN_SERVICE,
  });
  return credentials ? credentials.password : null;
}

export async function hasPin(): Promise<boolean> {
  return (await getPin()) !== null;
}

export async function clearPin(): Promise<void> {
  await Keychain.resetGenericPassword({ service: PIN_SERVICE });
  await Keychain.resetGenericPassword({ service: BIOMETRIC_SERVICE });
}

export function getBiometryType(): Promise<BiometryType> {
  return Keychain.getSupportedBiometryType();
}

/**
 * Stores a biometric-protected item;
 * reading it later shows the OS prompt.
 */
export async function enableBiometrics(): Promise<void> {
  await Keychain.setGenericPassword('biometric', 'unlock', {
    service: BIOMETRIC_SERVICE,
    accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET,
    accessible: Keychain.ACCESSIBLE.WHEN_PASSCODE_SET_THIS_DEVICE_ONLY,
  });
}

/**
 * Resolves true if the user passed the biometric prompt,
 * false otherwise.
 */
export async function authenticateWithBiometrics(): Promise<boolean> {
  try {
    const result = await Keychain.getGenericPassword({
      service: BIOMETRIC_SERVICE,
      authenticationPrompt: {
        title: 'Unlock Countries',
        cancel: 'Use PIN',
      },
    });
    return result !== false;
  } catch {
    // cancelled, failed, or biometrics changed
    return false;
  }
}
