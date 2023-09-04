const listAllResponse = [
  {
    _id: "64d1275e8695192bab9a1ec4",
    name: "Mono ambiente centrico",
    pricePerNight: 90,
    __v: 0,
  },
  {
    _id: "64d1489fdb349b6cd3dafb92",
    name: "Departamento en Achumani",
    pricePerNight: 150,
    __v: 0,
  },
  {
    _id: "64d148a8db349b6cd3dafb94",
    name: "Departamento en San Miguel",
    pricePerNight: 150,
    __v: 0,
  },
];

const createPropertyRequest = {
  name: "Departamento en Sopocachi",
  pricePerNight: 125,
};

const createPropertyResponse = {
  name: "Departamento en Sopocachi",
  pricePerNight: {
    value: 125,
  },
};

module.exports = {
  listAllResponse,
  createPropertyRequest,
  createPropertyResponse,
};
