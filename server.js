const express = require("express");
const PropertyService = require("./src/services/property");

const app = express();

app.get("/properties", async function (req, res) {
  try {
    console.log("0001");
    const propertyService = new PropertyService("http://localhost:3000");
    const response = await propertyService.getAllProperties();
    console.log("0002");
    console.log("response", response);
    res.send(response);
  } catch (error) {
    console.log("0004");
    console.error(error);
    res.status(500).send("Error en la llamada HTTP");
  }
});

app.listen(3002);
