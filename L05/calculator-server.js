// Load Libraries และกำหนดค่า
const SERVER_PORT = 50002
const PROTO_PATH = "./calculator.proto";
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
const calculator_proto = grpc.loadPackageDefinition(packageDefinition);

// ฟังก์ชันคำนวณ
function onCalculate(call, callback) {
    const { num1, num2, operator } = call.request;
    let result;
    let message;

    console.log(`Calculating: ${num1} ${operator} ${num2}`);

    switch (operator) {
        case '+':
            result = num1 + num2;
            message = `${num1} + ${num2} = ${result}`;
            break;
        case '-':
            result = num1 - num2;
            message = `${num1} - ${num2} = ${result}`;
            break;
        case '*':
            result = num1 * num2;
            message = `${num1} * ${num2} = ${result}`;
            break;
        case '/':
            if (num2 === 0) {
                callback({
                    code: grpc.status.INVALID_ARGUMENT,
                    message: "Cannot divide by zero"
                });
                return;
            }
            result = num1 / num2;
            message = `${num1} / ${num2} = ${result}`;
            break;
        default:
            callback({
                code: grpc.status.INVALID_ARGUMENT,
                message: `Invalid operator: ${operator}. Use +, -, *, or /`
            });
            return;
    }

    callback(null, {
        result: result,
        message: message
    });
}

// Main function
function main() {
    const server = new grpc.Server();
    
    server.addService(calculator_proto.Calculator.service, {
        calculate: onCalculate,
    });
    
    server.bindAsync(
        `0.0.0.0:${SERVER_PORT}`,
        grpc.ServerCredentials.createInsecure(),
        (error, port) => {
            if (error) {
                console.error('Server bind failed:', error);
                return;
            }
            console.log(`Calculator gRPC Server running on port ${SERVER_PORT}`);
        }
    );
}

main();
