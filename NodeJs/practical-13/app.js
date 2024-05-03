const { MongoClient } = require('mongodb');
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const uri = 'mongodb://127.0.0.1:27017';
const dbName = 'labmanual';
const collectionName = 'practicals';


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

app.post("/delete", async (req, res) => {
  const select1 = req.body.selection;
  const selectText = req.body.updateText;
  const query = {};
  query[select1]= selectText;

  console.log(query);

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const result = await collection.deleteMany(query);
    res.redirect("http://127.0.0.1:5500/practical-13/index.html");
  } catch (error) {
    console.error('Error deleting data:', error);
  } finally {
    await client.close();
  }


});

app.listen(5000, () => {
  console.log("server started");
});
