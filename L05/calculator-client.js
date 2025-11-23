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

// Main function
function main() {
    const client = new calculator_proto.Calculator(
        `localhost:${SERVER_PORT}`,
        grpc.credentials.createInsecure()
    );

    // ทดสอบการคำนวณหลายแบบ
    const testCases = [
        { num1: 5, num2: 3, operator: '*' },   // ตามโจทย์: 5 * 3 = 15
        { num1: 10, num2: 2, operator: '+' },  // 10 + 2 = 12
        { num1: 20, num2: 5, operator: '-' },  // 20 - 5 = 15
        { num1: 15, num2: 3, operator: '/' },  // 15 / 3 = 5
        { num1: 10, num2: 0, operator: '/' },  // Error: divide by zero
        { num1: 5, num2: 2, operator: '%' },   // Error: invalid operator
    ];

    testCases.forEach((testCase, index) => {
        client.calculate(testCase, (error, response) => {
            console.log(`\n===== Test Case ${index + 1} =====`);
            if (error) {
                console.log(`Error: ${error.message}`);
            } else {
                console.log(`${response.message}`);
                console.log(`Result: ${response.result}`);
            }
        });
    });
}

main();
