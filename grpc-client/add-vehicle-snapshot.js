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

// define vehicle and cargo
const snapshotData = [];
snapshotData.length = vehicle.axisesAmount;
snapshotData.fill('a', 0);
const totalWeight = faker.random.number({ min: 7000, max: 10000 });
const cargoWeight = faker.random.number({ min: 300, max: totalWeight });

const snapshot = {
  id: faker.random.number({ min: 0, max: 10000 }),
  timestamp: new Date(),
  totalWeight,
  cargoWeight,
  data: snapshotData.map((axis, index) => {
    let lifted = faker.random.boolean();
    return Object({
      weight: lifted ? 0 : Math.floor(cargoWeight / 3),
      lifted,
      axisId: index + 1,
    });
  }),
};

// console.log(snapshot);

//Create gRPC client for vehicle package and VehicleExploitationService
const client = new proto.vehicle.VehicleExploitationService(
  REMOTE_SERVER,
  grpc.credentials.createInsecure(), // TODO - use AUTH
);

// TODO returns vehicleID (use vehicleID to add snapshot)
client.addVehicle(vehicle, (error, result) => {
  if (error) return console.error(error);
  console.log('successfully addVehicle:', result);
  const { id } = result;
  snapshot.vehicleId = id;
  console.log(snapshot);
  // add snapshot
  client.addSnapshot(snapshot, (error, result) => {
    if (error) return console.error(error);
    console.log('successfully addSnapshot:', result);
  });
});
