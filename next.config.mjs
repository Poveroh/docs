import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX({
  mdxOptions: {
    lastModifiedTime: "git",
  },
});

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  redirects: async () => [
    {
      source: "/",
      destination: "/developers",
      permanent: true,
    },
  ],
};

export default withMDX(config);
