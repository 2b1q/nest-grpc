const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

//Load the protobuf
const proto = grpc.loadPackageDefinition(
  protoLoader.loadSync('./axis.proto', {
    keepCase: false,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }),
);

const REMOTE_SERVER = 'grpc_service:5000';

//Create gRPC client for axis package and AxisService
const client = new proto.axis.AxisService(
  REMOTE_SERVER,
  grpc.credentials.createInsecure(),
);

client.FindOne({ id: 'uuid-3' }, (error, axis) => {
  if (!error) return console.log('successfully fetch Axis:', axis);
  console.error(error);
});

client.List({}, (error, axises) => {
  if (!error) return console.log('successfully fetch Axis List:', axises);
  console.error(error);
});

client.Insert({ id: 'uuid_', a1: 1, a2: 4 }, (err, axises) => {
  if (err) return console.error('client insert failed:', err);
  console.log('sucess insertion:', axises);
});
