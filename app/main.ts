import * as net from "net";
import { buffer } from "stream/consumers";

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

//Uncomment this to pass the first stage
const server = net.createServer((socket) => {
  
  console.log(Buffer.from(`HTTP/1.1 200 OK\r\n\r\n`))
  socket.write(Buffer.from(`HTTP/1.1 200 OK\r\n\r\n`));
  socket.end();
  });

server.listen(4221, "localhost");
