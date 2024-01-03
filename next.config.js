/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.travelapi.com'],
  },
  async rewrites() {
    return [
      {
        source: '/search/:query*',
        destination: 'https://exterior-technical-test-api.vercel.app/location/fts/:query*',
      },
    ];
  },
}

module.exports = nextConfig
