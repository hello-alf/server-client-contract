const { PactV3, MatchersV3 } = require("@pact-foundation/pact");
const path = require("path");
const { describe, it } = require("mocha");
const { expect } = require("chai");
const {
  listAllResponse,
  createPropertyRequest,
  createPropertyResponse,
} = require("../response");
const PropertyService = require("../../../src/services/property");

const { like } = MatchersV3;

let proptertyService;

describe("API de Propiedades", () => {
  const provider = new PactV3({
    consumer: "node-server-client",
    provider: "microservice-booking",
    dir: path.resolve(process.cwd(), "pacts"),
  });

  describe("Listar todas las propiedades", () => {
    it("Lista una propiedad y devuelve 3 elementos", () => {
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
          //Expect
          expect(response).to.be.not.null;
          expect(response.length).to.equal(listAllResponse.length);
        });
      });
    });
  });

  describe("Crear una propiedad", () => {
    it("Crea una propiedad con todas las propiedades", () => {
      //Arrange
      provider
        .given("crear propiedad")
        .uponReceiving("Crear propiedad")
        .withRequest({
          method: "POST",
          path: "/property",
          headers: {
            Accept: "application/json",
          },
          body: createPropertyRequest,
        })
        .willRespondWith({
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
          body: like(createPropertyResponse),
        });

      return provider.executeTest(async (mockServer) => {
        // Act
        proptertyService = new PropertyService(mockServer.url);
        return proptertyService
          .createProperty(createPropertyRequest)
          .then((response) => {
            //Expect
            expect(response).to.be.not.null;
          });
      });
    });
  });
});
