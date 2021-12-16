module.exports = {
  exportPathMap: async function(
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
    ) {
    return {
      "/": { page: "/" },
      "/about": { page: "/about" },
      "/cards": { page: "/cards"}
    };
  },
  images: {
    loader: 'imgix',
    path: '',
  },
  reactStrictMode: true,
  swcMinify: false
}
