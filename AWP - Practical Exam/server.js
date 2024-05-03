const { MongoClient } = require("mongodb");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const uri = "mongodb://127.0.0.1:27017";
const dbName = "awp";
const collectionName = "exam";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get("/", async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.find({}).toArray();
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
});

app.post("/upload", async (req, res) => {
  const data = [
    {
      name: req.body.name,
      city: req.body.city,
      Enrollment: req.body.Enrollment,
    },
  ];
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.insertMany(data);
    res.redirect("http://127.0.0.1:5500");
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
});

app.post("/delete", async (req, res) => {
  const select1 = req.body.selection;
  const selectText = req.body.updateText;
  const query = {};
  query[select1] = selectText;

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.deleteMany(query);
    res.redirect("http://127.0.0.1:5500");
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`server started at port: ${port}`);
});
