const { createMDX } = require('fumadocs-mdx/config');

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: '/docs',
  output: 'export',
  images: {
    unoptimized: true,
  },
};

module.exports = withMDX(nextConfig);
