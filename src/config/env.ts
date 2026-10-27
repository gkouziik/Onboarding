import Config from 'react-native-config';

export const env = {
  apiUrl: Config.API_URL ?? '',
  apiKey: Config.API_KEY ?? '',
} as const;
