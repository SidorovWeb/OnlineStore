/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "fakestoreapi.com",
      "lh3.googleusercontent.com",
      "sun1-28.userapi.com",
      "sun6-22.userapi.com",
    ],
  },
};

module.exports = nextConfig;
