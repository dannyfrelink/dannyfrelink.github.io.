/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  devIndicators: {
    buildActivity: false,
  },
  output: {
    dir: "out",
  },
};

const withTM = require("next-transpile-modules")(["tailwindcss"]);

module.exports = withTM(nextConfig);
