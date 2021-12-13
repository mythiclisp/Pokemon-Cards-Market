module.exports = {
  exportPathMap: async function(
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
    ) {
    return {
      "/": { page: "/" },
      "/about": { page: "/about" },
    };
  },
  images: {
    loader: 'imgix',
    path: '',
  },
  reactStrictMode: true,
  swcMinify: false
}