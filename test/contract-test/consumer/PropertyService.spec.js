const { PactV3, MatchersV3 } = require("@pact-foundation/pact");
const { describe, it } = require("mocha");
const { listAllResponse } = require("../response");
const PropertyService = require("../../../src/services/property");

const provider = new PactV3({
  consumer: "node-server-client",
  provider: "microservice-booking",
});

describe("API de Propiedades", () => {
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
        //Assert
        expect(response).to.be.not.null;
        // expect(response).to.be.a.string;
        console.log("antes de comparar");
        expect(response.length).to.be.length(listAllResponse.length);
        console.log("despues de comparar");
      });
    });
  });
});
