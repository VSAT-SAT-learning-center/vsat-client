const config = {
  development: {
    apiUrl: 'http://localhost:5000', // Development API URL
  },
  // production: {
  //   apiUrl: 'https://api.yourapp.com',
  // },
};

// eslint-disable-next-line no-undef
export default config[process.env.NODE_ENV || 'development'];