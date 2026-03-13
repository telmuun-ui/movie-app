import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        pathname: '/t/p/**', 
      },
    ],
  },

  env: {
    TDBM_BASE_URL: process.env.TDBM_BASE_URL,
    TMDB_IMAGE_SERVICE_URL: process.env.TMDB_IMAGE_SERVICE_URL,
    NEXT_PUBLIC_MOVIE_DB_API_KEY: process.env.NEXT_PUBLIC_MOVIE_DB_API_KEY
  },
};

export default nextConfig;
