const SERVER_PORT = 50001
const PROTO_PATH = "./helloworld.proto";
const OPTIONS = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, OPTIONS);
const hello_proto = grpc.loadPackageDefinition(packageDefinition);

// Main function
function main() {
    const client = new hello_proto.Greeter(
        `localhost:${SERVER_PORT}`,
        grpc.credentials.createInsecure()
    );

    // ถ้าใช้ sayHello (basic)
    client.sayHello({name: 'John'}, (error, response) => {
        if (response) {
            console.log(`Greeting: ${response.message}`);
        } else {
            console.log(error);
        }
    });

    // ถ้าใช้ helloWithDetail (advanced)
    ['Alice', 'Bob', 'John', 'Jane'].forEach(name => {
        client.helloWithDetail({name: name}, (error, response) => {
            console.log("===========================");
            if (response) {
                console.log(`Greeting: ${response.message}`);
                console.log(`Your salary is: ${response.salary.toFixed(2)}`);
                console.log(`This user is ${response.isActive ? 'active' : 'inactive'}`);
                console.log(`User type: ${response.userType}`);
            } else {
                console.log(error);
            }
        });
    });
}

main();
