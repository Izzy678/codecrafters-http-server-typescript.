import * as net from "net";

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");
//Uncomment this to pass the first stage
const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    const requestString = data.toString();
    const requestLines = requestString.split('\r\n');
    console.log("request line",requestLines)
    const requestLine = requestLines[0];
    const path = data.toString().split(" ")[1];
    const userAgent = requestLines[3].split("UserAgent: ")[1]
  
    const randomStringPath = path.split("/")[2];
    let response = "";
    if (path ==`/echo/${randomStringPath}`) {
      response = `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${randomStringPath.length}\r\n\r\n${randomStringPath}`;
    }
    if (path ==`/user-agent`) {
      console.log("userAgent",userAgent)
      response = `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length:${userAgent.length}\r\n\r\n${userAgent}`
     // response = `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${userAgent.length}\r\n\r\n${userAgent}`;
    }
    if (path == "/") {
      response = `HTTP/1.1 200 OK\r\n\r\n`;
    }
    if(response=="") {
      response = `HTTP/1.1 404 Not Found\r\n\r\n`;
    }
    socket.write(response);
    socket.end();
  });
});

server.listen(4221, "localhost");
