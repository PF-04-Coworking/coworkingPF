import { hostname } from "os";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin()

// next.config.mjs
const nextConfig = {
  pageExtensions: ["tsx", "ts", "jsx", "js"],
  webpack(config, options) {
    config.resolve.modules.push("./src");
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        hostname: "www.officelovin.com",
        pathname: "/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
