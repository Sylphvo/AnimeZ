module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['example.com'], // Replace with your image domains if needed
  },
  webpack: (config) => {
    // Custom webpack configuration can go here
    return config;
  },
};