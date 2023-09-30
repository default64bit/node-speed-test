const { createClient } = require("redis");

const client = createClient({
    url: "redis://redis:6379",
});

client.on("error", (err) => console.log("Redis Client Error", err));

const testRedis = async () => {
    await client.set("key", "value");
    return await client.get("key");
};

const PORT = 3000;
const HOST = '0.0.0.0';

// ========================================= express
// const express = require("express");

// const server = express();

// server.use("/", async (req, res) => {
//     const v = await testRedis();
//     res.write(v);
//     res.end("s");
// });

// server.listen(PORT, async () => {
//     await client.connect();
//     console.log(`on port ${PORT}`);
// });
// ========================================

// ======================================== http module
const http = require("http");

const server = http.createServer(async (req, res) => {
    res.writeHead(200);

    const v = await testRedis();
    res.write(v);

    res.end("My first server24!");
});

server.listen(PORT, HOST, async () => {
    await client.connect();
    console.log(`Server is running on ${PORT}`);
});
// ========================================

// ======================================== turbo http
// const turbo = require("turbo-http");

// const server = turbo.createServer((req, res) => {
//     // res.setHeader("Content-Length", "11");
//     // res.write(Buffer.from("hello world"));
//     res.write("ddd");
//     res.end();
// });

// server.listen(PORT);
// ========================================
