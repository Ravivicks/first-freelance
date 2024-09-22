import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images-na.ssl-images-amazon.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "download.schneider-electric.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.ebayimg.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.tsisolutions.us",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "60mb", // Adjust this limit as needed
    },
  },
  staleTimes: {
    dynamic: 30,
    static: 180,
  },
  webpackMemoryOptimizations: true,
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
