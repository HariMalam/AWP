const http = require("http");
const fs = require("fs");
const formidable = require("formidable");

http
  .createServer(function (req, res) {
    // Handle file upload request
    if (req.url == "/upload") {
      var form = new formidable.IncomingForm();

      form.parse(req, function (err, fields, files) {
        // Get the old path of the uploaded file
        var oldpath = files.file[0].filepath;
        console.log(oldpath);

        var newpath = __dirname + "/uploads/" + files.file[0].originalFilename;

        // Move the uploaded file to the new path
        const readStream = fs.createReadStream(oldpath);
        const writeStream = fs.createWriteStream(newpath);
        readStream.pipe(writeStream);
        writeStream.on("error", function (err) {
          console.error("Error copying file:", err);
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Error uploading file");
        });

        // When copying is complete, respond to the client
        writeStream.on("finish", function () {
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.end("File uploaded successfully");
        });
      });
    } else {
      fs.readFile("index.html", (err, data) => {
        if (err) {
          res.writeHead(500);
          res.end(err.message);
        } else {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(data);
        }
      });
    }
  })
  .listen(3000);
