/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  devIndicators: {
    buildActivity: false,
  },
};

const withTM = require("next-transpile-modules")(["tailwindcss"]);

module.exports = withTM(nextConfig);
