/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sitem.ssgcdn.com',
        port: '',
      },
    ],
  },
}

module.exports = nextConfig

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