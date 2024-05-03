const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("mongodb");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());

const mongoURI = "mongodb://127.0.0.1:27017";
const dbName = "library";
app.use(cors());

mongodb.MongoClient.connect(mongoURI)
  .then((client) => {
    console.log("MongoDB connected");
    const db = client.db(dbName);
    const collection = db.collection("books");

    app.post("/api/books", (req, res) => {
      const { title, author } = req.body;
      collection
        .insertOne({ title, author, available: true })
        .then((result) => {
          res.json(result.insertedId);
        })
        .catch((err) => {
          res.status(500).send("Error adding book");
        });
    });

    app.get("/api/books", (req, res) => {
      collection
        .find({})
        .toArray()
        .then((books) => res.json(books))
        .catch((err) => res.status(500).send("Error fetching books"));
    });

    app.delete("/api/books/:id", (req, res) => {
      const { id } = req.params;
      collection
        .deleteOne({ _id: new mongodb.ObjectId(id) })
        .then((result) => res.json(result))
        .catch((err) => res.status(500).send("Error removing book"));
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));
