// Load Libraries และกำหนดค่า
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

// สร้าง callback function ที่จัดการคำขอ SayHello
function onHello(call, callback) {
    console.log("On Hello Handle called");
    // First null parameter means no error
    callback(null, { message: `Hello ${call.request.name}, How are you ?` });
}

// เพิ่มฟังก์ชันใหม่นี้ไว้ด้านล่าง function onHello(call, callback) { ... }
function onHelloWithDetail(call, callback) {
    console.log(`On HelloWithDetail called for ${call.request.name}`);
    // Generate Random Data
    const salary = Math.random() * (30000 - 5000) + 5000;
    const isActive = Math.random() > 0.5 ? true : false;
    const userType = Math.random() > 0.5 ? 'ADMIN' : 'USER';
    
    callback(null, {
        message: `Report to ${call.request.name}`,
        salary: salary,
        isActive: isActive,
        userType: userType, // จะถูกส่งเป็น String และ gRPC จะแปลงเป็น Enum ID
    });
}

// Main function
function main() {
    const server = new grpc.Server();
    
    server.addService(hello_proto.Greeter.service, {
        sayHello: onHello,
        // ลงทะเบียน Method ใหม่
        helloWithDetail: onHelloWithDetail,
    });
    
    // ผูก Server กับ Address และ Port
    server.bindAsync(
        `0.0.0.0:${SERVER_PORT}`,
        grpc.ServerCredentials.createInsecure(),
        (error, port) => {
            if (error) {
                console.error('Server bind failed:', error);
                return;
            }
            // ลบ server.start() ออกเพราะไม่จำเป็นใน version ใหม่
            console.log(`gRPC Server running on port ${SERVER_PORT}`);
        }
    );
}

main(); // เรียก Main function
