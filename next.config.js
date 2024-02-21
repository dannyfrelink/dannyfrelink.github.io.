/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  devIndicators: {
    buildActivity: false,
  },
};

const withTM = require("next-transpile-modules")(["tailwindcss"]);

module.exports = withTM(nextConfig);
