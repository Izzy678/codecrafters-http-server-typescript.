import * as net from "net";
import fs from "fs";
import filePath from "path";

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");
//Uncomment this to pass the first stage
const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    const requestString = data.toString();
    const requestLines = requestString.split("\r\n");
    const method = requestLines[0].split(" ")[0];
    console.log("method", method);
    console.log("REQUEST LINES", requestLines);
    const requestLine = requestLines[0];

    const path = data.toString().split(" ")[1];
    const specialFilePath = path.split("/");
    console.log("specialFilePath", specialFilePath);
    const userAgent = requestLines[2].split(": ")[1];

    const randomStringPath = path.split("/")[2];
    let response = "";
    const newpath = filePath.join(__dirname, "../");
    if (specialFilePath[1] == "files") {
      console.log("process Arg", process.argv);
      const fileDirectory = process.argv[3];
      console.log("file driectory", fileDirectory);
      const directoryPath = filePath.join("./", fileDirectory);
      //check if dir exis
      if (!fs.existsSync(fileDirectory)) {
        console.log("run");
        fs.mkdirSync(directoryPath); 
        console.log("directoryPath", directoryPath);
        console.log("end");
      }
      const directory = `/${directoryPath}/`;
      const filename = specialFilePath[2];
      const createdFilePath = filePath.join(directory, filename);
      if (method == "POST") {
        //create file
        console.log("run");
        console.log("specialFilePath",specialFilePath)
        const fileName = specialFilePath[2];
        const fileContent = requestLines[4];
        const newFilePath = filePath.join(fileDirectory,fileName);
        fs.writeFileSync(newFilePath, fileContent);
        console.log("file content", fileContent);
        response = "HTTP/1.1 201 Created\r\n\r\n";
      } else {
        try {
          // Read the file synchronously
          const data = fs.readFileSync(createdFilePath);
          // Get file stats
          const stats = fs.statSync(createdFilePath);

          // Get file size (content length)
          const fileSize = stats.size;
          response = `HTTP/1.1 200 OK\r\nContent-Type: application/octet-stream\r\nContent-Length: ${fileSize}\r\n\r\n${data}`;
          console.log("File content:", data.toString());
        } catch (err) {
          response = `HTTP/1.1 404 Not Found\r\n\r\n`;
          console.error("Error reading the file:", err);
        }
      }
    }

    if (path == `/echo/${randomStringPath}`) {
      response = `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${randomStringPath.length}\r\n\r\n${randomStringPath}`;
    }

    if (path == `/user-agent`) {
      console.log("userAgent", userAgent);
      response = `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length:${userAgent.length}\r\n\r\n${userAgent}`;
      // response = `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${userAgent.length}\r\n\r\n${userAgent}`;
    }

    if (path == "/") {
      response = `HTTP/1.1 200 OK\r\n\r\n`;
    }

    if (response == "") {
      response = `HTTP/1.1 404 Not Found\r\n\r\n`;
    }
    socket.write(response);
    socket.end();
  });
});

server.listen(4221, "localhost");
