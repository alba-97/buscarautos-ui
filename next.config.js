/** @type {import('next').NextConfig} */

const apiUrl = new URL(
  process.env.NEXT_PUBLIC_API_URL ||
    "https://buscarautos-api.netlify.app/.netlify/functions/server/api"
);

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: apiUrl.protocol.replace(":", ""),
        hostname: apiUrl.hostname,
        port: apiUrl.port,
      },
    ],
    dangerouslyAllowSVG: true,
    unoptimized: true,
  },
};

module.exports = nextConfig;
