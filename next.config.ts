import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  logging: {
    browserToTerminal: false,
  },
  images: {
    remotePatterns: [
       {
        protocol: "https",
        hostname: "secure.gravatar.com",
      },
      {
        protocol: "https",
        hostname: "mps.digital-monkey.in",
      }
    ],
  }
};

export default withNextIntl(nextConfig);