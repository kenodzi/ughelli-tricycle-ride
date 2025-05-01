
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.785a24e79d7e4f64ba717f81be9378de',
  appName: 'ughelli-tricycle-ride',
  webDir: 'dist',
  server: {
    url: 'https://785a24e7-9d7e-4f64-ba71-7f81be9378de.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#008604", // Using keke-primary color
      showSpinner: true,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#FFCB05", // Using keke-secondary color
    }
  }
};

export default config;
