import * as net from "net";

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");
//Uncomment this to pass the first stage
const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    const path = data.toString().split(" ")[1];
    const randomStringPath = path.split("/")[2];
    let response = "";
    console.log("path",path)
    console.log("random",randomStringPath)
    // if (path ==`${path}`) {
    //   const newRandomStringPath = path.split('/')[1];
    //   console.log("this should run")
    //   response = `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${newRandomStringPath.length}\r\n\r\n${newRandomStringPath}`;
    // }
    if (path ==`/echo/${randomStringPath}`) {
      console.log("this shuld work")
      response = `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${randomStringPath.length}\r\n\r\n${randomStringPath}`;
    }
    if (path == "/") {
      response = `HTTP/1.1 200 OK\r\n\r\n`;
    }
    if(response=="") {
      console.log('test')
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
