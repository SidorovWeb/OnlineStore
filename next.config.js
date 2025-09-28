/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     domains: [
//       "fakestoreapi.com",
//       "lh3.googleusercontent.com",
//       "sun1-28.userapi.com",
//       "sun6-22.userapi.com",
//     ],
//   },
// };

// module.exports = nextConfig;
const nextConfig = {
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      "fakestoreapi.com",
      "via.placeholder.com",
      "lh3.googleusercontent.com",
      "sun1-28.userapi.com",
      "sun6-22.userapi.com",
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "User-Agent",
            value: "Mozilla/5.0 (compatible; Vercel-Bot/1.0)",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
