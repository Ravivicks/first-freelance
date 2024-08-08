import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.unsplash.com",
      "m.media-amazon.com",
      "download.schneider-electric.com",
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "60mb", // Adjust this limit as needed
    },
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
