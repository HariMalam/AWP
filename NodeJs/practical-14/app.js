const { MongoClient } = require("mongodb");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const uri = "mongodb://127.0.0.1:27017";
const dbName = "labmanual";
const collectionName = "practicals";

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


app.post("/update", async (req, res) => {
  const select1 = req.body.selection[0];
  const selectText = req.body.selectText;
  const select2 = req.body.selection[1];
  const updateText = req.body.updateText;

  const filter = {};
  filter[select1]= selectText;

  const update = { $set: { [select2]: updateText } };

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const query = { name: "Hari" };
    const document = await collection.findOne(query);
    console.log("Selected document:", document);

    const result = await collection.updateOne(filter, update);
    res.redirect("http://127.0.0.1:5500/practical-14/index.html");

  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close();
  }

});

app.listen(5000, () => {
  console.log("server started");
});

