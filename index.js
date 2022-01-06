const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const app = express();
const ObjectId = require("mongodb").ObjectId;

const port = process.env.PORT || 8000;

// middle ware
app.use(cors());
app.use(express.json());

// mongo client
const client = new MongoClient(process.env.URI);

async function run() {
  try {
    await client.connect();

    const database = client.db("mediHealth");
    const doctorsCollection = database.collection("doctors");
    const servicesCollection = database.collection("services");
    const departmentsCollection = database.collection("departments");

    // get doctors
    app.get("/doctors", async (req, res) => {
      const result = await doctorsCollection.find({}).toArray();
      res.json(result);
    });

    // get services
    app.get("/services", async (req, res) => {
      const result = await servicesCollection.find({}).toArray();
      res.json(result);
    });

    // get departments
    app.get("/departments", async (req, res) => {
      const result = await departmentsCollection.find({}).toArray();
      res.json(result);
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Welcome to MediHealth server");
});

app.listen(port, () => {
  console.log("port running at localhost:", port);
});
