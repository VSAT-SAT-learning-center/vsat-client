const config = {
  development: {
    apiUrl: "https://server.vsatcenter.edu.vn/",
  },
  // production: {
  //   apiUrl: 'https://api.yourapp.com',
  // },
};

// eslint-disable-next-line no-undef
export default config[process.env.NODE_ENV || "development"];
