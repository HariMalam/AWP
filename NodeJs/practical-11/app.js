const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3060;

// Middleware for parsing JSON body
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));


const mypath = path.join(__dirname + "/views");

app.get("/", (req, res) => {
  res.sendFile(`${mypath}/index.html`);
});


// Route to create a new file
app.post("/create", (req, res) => {
  const { createFileName } = req.body;
  const filepath = path.join(__dirname + "/files/" + createFileName);
  console.log(filepath);
  fs.open(filepath, "w", (err, fd) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    fs.close(fd, (err) => {
      if (err) console.error(err);
      // res.json({ message: `${createFileName} created successfully.` });
      res.redirect('/');
    });
  });
});

// Route to read a file
app.post("/read", (req, res) => {
  const { readFileName } = req.body;
  const filepath = path.join(__dirname + "/files/" + readFileName);
  fs.readFile(filepath, "utf8", (err, data) => {
    if (err) {
      res.status(404).json({ error: `File ${readFileName} not found.` });
      return;
    }
    res.json({ content: data });
  });
});

// Route to write to a file
app.post("/write", (req, res) => {
  const { writeFileName, writeContent } = req.body;
  const filepath = path.join(__dirname + "/files/" + writeFileName);
  fs.writeFile(filepath, writeContent, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: `${writeFileName} updated successfully.` });
  });
});

// Route to delete a file
app.post("/delete", (req, res) => {
  const { deleteFileName } = req.body;
  const filepath = path.join(__dirname + "/files/" + deleteFileName);
  fs.unlink(filepath, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    // res.json({ message: `${deleteFileName} deleted successfully.` });
    res.redirect('/');
  });
});

// Route to fetch list of files
app.get("/files", (req, res) => {
  const filepath = path.join(__dirname + "/files/");
  fs.readdir(filepath, (err, files) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(files);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
