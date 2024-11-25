/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: 'localhost',
        port: '4000',
        pathname: '/**',
      },
      {
        protocol: "https",
        port: '',
        hostname: 'backendmostratecnica.online',
        pathname: '/api/**',
      },
    ]
  }
};

export default nextConfig;
