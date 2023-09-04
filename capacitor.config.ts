import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.check.prices',
  appName: 'check-prices-mobile',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
