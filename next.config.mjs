/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ 이 부분을 추가합니다.
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;