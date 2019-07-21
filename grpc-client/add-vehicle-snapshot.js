/*
 * Simple gRPC clinet
 * picks up './vehicle.exploitation.proto' proto (protobuf v.3) file
 * adds vehicle via gRPC using fake data
 * adds vehicle exploitation snapshots data
 */
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

//Load the protobuf
const proto = grpc.loadPackageDefinition(
  protoLoader.loadSync('./vehicle.exploitation.proto', {
    keepCase: false,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }),
);

const REMOTE_SERVER = 'grpc_service:5001';

// fake it
const faker = require('faker');
faker.locale = 'ru';
const randomBirthday = require('random-birthday');
const vinGenerator = require('vin-generator');

const lorrys = [
  'Scania',
  'MAN',
  'PACCAR Inc',
  'Iveco',
  'Hino',
  'Volvo',
  'Navistar International Corp',
  'Dongfeng',
  'TATA Motors Limited',
  'Daimler Group',
  'KAMAZ',
  'Naser',
];

const productionDate = randomBirthday({ min: 1980, max: 1980 });

const vehicle = {
  axisesAmount: faker.random.number({ min: 2, max: 10 }),
  vin: vinGenerator.generateVin(),
  carNumber: faker.random.alphaNumeric(7),
  manufacturer: faker.random.arrayElement(lorrys),
  model: faker.random.alphaNumeric(4),
  modelYear: productionDate.toString().split(' ')[3],
  productionDate,
  driver: {
    age: randomBirthday({ min: 1960, max: 2000 }),
    name: faker.name.firstName(),
    secondName: 'Петрович', // \0/
    lastName: faker.name.lastName(),
    license: faker.random.alphaNumeric(4) + '-' + faker.random.alphaNumeric(6),
  },
};

// console.log('vehicle', vehicle);
const snapshot = {};

//Create gRPC client for vehicle package and VehicleExploitationService
const client = new proto.vehicle.VehicleExploitationService(
  REMOTE_SERVER,
  grpc.credentials.createInsecure(), // TODO - use AUTH
);

// TODO add fake generated data
client.addVehicle(vehicle, (error, result) => {
  if (error) return console.error(error);
  console.log('successfully addVehicle:', result);
});
