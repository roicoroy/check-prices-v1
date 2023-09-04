import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'check-prices-v1',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
