const express = require("express");
const axios = require("axios");

const app = express();
const url = "http://localhost:3000/property";

app.get("/properties", function (req, res) {
  // Realizar la llamada HTTP utilizando Axios
  axios
    .get(`${url}/`)
    .then((response) => {
      // Manejar la respuesta del servidor remoto
      res.send(response.data); // Enviar la respuesta al cliente de Express
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error en la llamada HTTP");
    });
});

app.listen(3002);
