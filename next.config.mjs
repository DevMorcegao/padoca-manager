/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        "undici": false,
      };
    }
    config.resolve.alias = {
      ...config.resolve.alias,
      'undici': require.resolve('undici')
    }
    return config
  },
  experimental: {
    serverActions: false
  },
  transpilePackages: ['@firebase/auth'],
}

export default nextConfig
