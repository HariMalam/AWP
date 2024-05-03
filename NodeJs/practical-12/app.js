const { MongoClient } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017";
const dbName = "labmanual";
const collectionName = "practicals";
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

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
    console.log(result);
    res.send(result);
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    await client.close();
  }
});

app.post("/upload", async (req, res) => {
  const data = [
    {
      name: req.body.name,
      age: req.body.age,
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
    res.redirect("http://127.0.0.1:5500/practical-12/index.html");
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    await client.close();
  }
});

app.listen(5000, () => {
  console.log("server started");
});
