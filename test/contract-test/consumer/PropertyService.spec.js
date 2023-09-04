const { PactV3, MatchersV3 } = require("@pact-foundation/pact");
const path = require("path");
const { describe, it } = require("mocha");
const { expect } = require("chai");
const { listAllResponse } = require("../response");
const PropertyService = require("../../../src/services/property");

const provider = new PactV3({
  consumer: "node-server-client",
  provider: "microservice-booking",
  dir: path.resolve(process.cwd(), "pacts"),
});

describe("API de Propiedades", () => {
  before(() => {
    return provider.setup();
  });

  describe("Listar todas las propiedades", () => {
    //Arrange
    provider
      .given("listar propiedades")
      .uponReceiving("listar todas las propiedades")
      .withRequest({
        method: "GET",
        path: "/property",
        headers: {
          Accept: "application/json",
        },
      })
      .willRespondWith({
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
        body: listAllResponse,
      });

    return provider.executeTest(async (mockServer) => {
      // Act
      proptertyService = new PropertyService(mockServer.url);
      return proptertyService.getAllProperties().then((response) => {
        expect(response).to.be.not.null;
        expect(response.length).to.equal(listAllResponse.length);
      });
    });
  });
});
