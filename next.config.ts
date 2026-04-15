import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig = {
  logging: {
    browserToTerminal: false,
  },
};

export default withNextIntl(nextConfig);