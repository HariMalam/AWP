const http = require("http");
const fs = require("fs");
const formidable = require("formidable");
const zlib = require("zlib");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    fs.readFile("index.html", (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end(err.message);
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  } else if (req.url === "/readFileSync" && req.method === "POST") {
    const form = new formidable.IncomingForm();
    form.uploadDir = "./uploads"; // Specify upload directory
    form.keepExtensions = true; // Keep file extensions
    form.parse(req, (err, fields, files) => {
      if (err) {
        res.writeHead(500);
        res.end(err.message);
      } else {
        const uploadedFile = files.file[0]; // Access the first file object
        const filePath = uploadedFile.filepath; // Use the filepath property
        const fileContent = fs.readFileSync(filePath, "utf8");
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(fileContent);
      }
    });
  } else if (req.url === "/readFileAsync" && req.method === "POST") {
    const form = new formidable.IncomingForm();
    form.uploadDir = "./uploads"; // Specify upload directory
    form.keepExtensions = true; // Keep file extensions
    form.parse(req, (err, fields, files) => {
      if (err) {
        res.writeHead(500);
        res.end(err.message);
      } else {
        const uploadedFile = files.file[0]; // Access the first file object
        const filePath = uploadedFile.filepath; // Use the filepath property
        fs.readFile(filePath, "utf8", (err, fileContent) => {
          if (err) {
            res.writeHead(500);
            res.end(err.message);
          } else {
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end(fileContent);
          }
        });
      }
    });
  }

  else if (req.url === "/compressFile" && req.method === "POST") {
    const form = new formidable.IncomingForm();
    form.uploadDir = "./uploads"; // Specify upload directory
    form.keepExtensions = true; // Keep file extensions
    form.parse(req, (err, fields, files) => {
      if (err) {
        res.writeHead(500);
        res.end(err.message);
      } else {
        const uploadedFile = files.file[0]; // Access the first file object
        const filePath = uploadedFile.filepath; // Use the filepath property
        
        // Create a read stream to read the file
        const readStream = fs.createReadStream(filePath);
        
        // Create a write stream to write the compressed file
        const compressedFilePath = filePath + '.gz';
        const writeStream = fs.createWriteStream(compressedFilePath);
        
        // Pipe the read stream to the zlib createGzip() function and then to the write stream
        readStream.pipe(zlib.createGzip()).pipe(writeStream);
        
        // Handle events on the write stream
        writeStream.on('finish', () => {
          // Set headers to indicate that the response is a downloadable file
          res.setHeader('Content-disposition', 'attachment; filename=' + uploadedFile.originalFilename + '.gz');
          res.setHeader('Content-Type', 'application/gzip');
          
          // Pipe the compressed file to the response stream
          const compressedReadStream = fs.createReadStream(compressedFilePath);
          compressedReadStream.pipe(res);
        });
        writeStream.on('error', (error) => {
          res.writeHead(500);
          res.end(error.message);
        });
      }
    });
  }

  else if (req.url === "/decompressFile" && req.method === "POST") {
    const form = new formidable.IncomingForm();
    form.uploadDir = "./uploads"; // Specify upload directory
    form.keepExtensions = true; // Keep file extensions
    form.parse(req, (err, fields, files) => {
      if (err) {
        res.writeHead(500);
        res.end(err.message);
      } else {
        const uploadedFile = files.file[0]; // Access the first file object
        const filePath = uploadedFile.filepath; // Use the filepath property

        // Decompressing the file
        const readStream = fs.createReadStream(filePath);
        const unzipStream = zlib.createGunzip();
        const writeStream = fs.createWriteStream(`./uploads/${uploadedFile.originalFilename.substring(0, uploadedFile.originalFilename.length - 3)}`);
        
        readStream.pipe(unzipStream).pipe(writeStream);

        // Handling events
        writeStream.on('finish', () => {
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.end("File decompressed successfully");
        });

        writeStream.on('error', (error) => {
          res.writeHead(500);
          res.end(error.message);
        });
      }
    });
  }
});

server.listen(5000, () => {
  console.log("Server is running on port 5000");
});
