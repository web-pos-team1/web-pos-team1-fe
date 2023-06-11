/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sitem.ssgcdn.com',
        port: '',
      },
    ],
  },
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  }
};

module.exports = nextConfig;

// module.exports = {
// 	async rewrites() {
//     console.log("destination: ", process.env.NEXT_PUBLIC_ENV_BE_HOST +"/:path*");
// 		return [
// 			{
// 				source: "/:path*",
// 				destination: process.env.NEXT_PUBLIC_ENV_BE_HOST + "/:path*",
// 			},
// 		];
// 	},
// }