const cluster = require("cluster");
const http = require("http");
// const express = require("express");

const PORT = 3000;
const numCPUs = require("os").cpus().length;
console.log(`CPU count ${numCPUs}`);

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    for (let i = 0; i < numCPUs - 2; i++) cluster.fork();

    cluster.on("exit", (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
    });
} else {
    // ========================================= express
    // const server = express();

    // server.use("/", async (req, res) => {
    //     res.end("s");
    // });

    // server.listen(PORT, async () => {
    //     console.log(`on port ${PORT}`);
    // });
    // ========================================

    // ======================================== http module
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end("My first server24!");
    }).listen(PORT, () => {
        console.log(`Server is running on ${PORT}`);
    });
    // ========================================
}
