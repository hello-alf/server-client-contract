const express = require("express");
const bodyParser = require("body-parser");

const PropertyService = require("./src/services/property");

const app = express();
const url = "http://localhost:3000";

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get("/properties", async function (req, res) {
  try {
    const propertyService = new PropertyService(url);
    const response = await propertyService.getAllProperties();
    res.send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error en la llamada HTTP");
  }
});

app.post("/properties", async function (req, res) {
  try {
    const propertyService = new PropertyService(url);
    const response = await propertyService.createProperty(req.body);
    res.send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error en la llamada HTTP");
  }
});

app.listen(3002);
