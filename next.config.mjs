/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["shizutify-music.s3.ap-northeast-1.amazonaws.com"],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
