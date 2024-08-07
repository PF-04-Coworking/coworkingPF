import { hostname } from "os";

// next.config.mjs
export default {
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
