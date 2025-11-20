import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
  // Deshabilitar source maps en desarrollo para evitar warnings
//   productionBrowserSourceMaps: false,
//   turbopack: (config, { dev }) => {
//     if (dev) {
//       config.devtool = 'eval-source-map'
//     }
//     return config
//   },
};

export default nextConfig;