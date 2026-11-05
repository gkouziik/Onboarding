import * as Keychain from 'react-native-keychain';

const BIOMETRY_LABELS: Partial<Record<Keychain.BIOMETRY_TYPE, string>> & {
  default: string;
} = {
  [Keychain.BIOMETRY_TYPE.FACE_ID]: 'Face ID',
  [Keychain.BIOMETRY_TYPE.TOUCH_ID]: 'Touch ID',
  default: 'biometrics',
};

/**
 * Returns a user-facing label for the given biometry type,
 * falling back to a generic label for unknown or missing types.
 */
export function biometryLabel(type: Keychain.BIOMETRY_TYPE | null): string {
  return (type && BIOMETRY_LABELS[type]) ?? BIOMETRY_LABELS.default;
}
