const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

//Load the protobuf
const proto = grpc.loadPackageDefinition(
  protoLoader.loadSync('./src/axis/axis.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }),
);

const REMOTE_SERVER = 'localhost:5000';

//Create gRPC client for axis package and AxisService
const client = new proto.axis.AxisService(
  REMOTE_SERVER,
  grpc.credentials.createInsecure(),
);

client.FindOne({ id: 'uuid-3' }, (error, axis) => {
  if (!error) {
    console.log('successfully fetch Axis:', axis);
  } else {
    console.error(error);
  }
});
