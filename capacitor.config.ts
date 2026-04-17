import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "app.lovable.8efc7a44e1b84d43acc1b536fec5218b",
  appName: "AgriSetu",
  webDir: "dist",
  server: {
    url: "https://8efc7a44-e1b8-4d43-acc1-b536fec5218b.lovableproject.com?forceHideBadge=true",
    cleartext: true,
  },
  android: {
    backgroundColor: "#16a34a",
  },
  ios: {
    backgroundColor: "#16a34a",
  },
};

export default config;
