const config = {
  development: {
    // apiUrl: "http://localhost:5000/",
    apiUrl: 'https://server.vsatcenter.edu.vn/',
  },
  // production: {
  //   apiUrl: 'https://server.vsatcenter.edu.vn/',
  // },
};

// eslint-disable-next-line no-undef
export default config[process.env.NODE_ENV || "development"];
