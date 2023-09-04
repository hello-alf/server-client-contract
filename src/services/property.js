const axios = require("axios");

class PropertyService {
  constructor(url) {
    this.url = url;
    if (!url) {
      url = "http://localhost:3000";
    }
  }

  getAllProperties = () => {
    return axios
      .get(`${this.url}/property`, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error);
        throw new Error(error);
      });
  };

  createProperty = (payload) => {
    return axios
      .post(`${this.url}/property`, payload, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error);
        throw new Error(error);
      });
  };
}

module.exports = PropertyService;
