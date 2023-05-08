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
  }
}

module.exports = nextConfig
