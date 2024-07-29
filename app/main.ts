import * as net from "net";
import { buffer } from "stream/consumers";

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");
//Uncomment this to pass the first stage
const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    const path = data.toString().split(" ")[1];
    let response = "";
    if (path == "/echo/abc") {
      response = `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: 3\r\n\r\nabc`;
    }
    if (path == "/") {
      response = `HTTP/1.1 200 OK\r\n\r\n`;
    }
    if (path == "/abcdefg") {
      response = `HTTP/1.1 404 Not Found\r\n\r\n`;
    }

    socket.write(response);
    socket.end();
  });
  // console.log("socket",socket)
  // socket.write(Buffer.from(`HTTP/1.1 200 OK\r\n\r\n`));
  // socket.write(`HTTP/1.1 200 OK\r\n\r\n`)
  // socket.end();
});

server.listen(4221, "localhost");
