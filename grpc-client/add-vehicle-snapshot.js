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

const REMOTE_SERVER = 'grpc-service:5001';

//Create gRPC client for vehicle package and VehicleExploitationService
const client = new proto.vehicle.VehicleExploitationService(
  REMOTE_SERVER,
  grpc.credentials.createInsecure(),
);

// TODO add fake generated data
client.addVehicle({}, (error, result) => {
  if (error) return console.error(error);
  console.log('successfully addVehicle:', result);
});
