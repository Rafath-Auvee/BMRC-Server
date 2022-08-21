const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.user}:${process.env.password}@cluster0.hazjcgw.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();

    const newsCollection = client.db("BMRC").collection("News");
    const eventCollection = client.db("BMRC").collection("Event");
    const memberCollection = client.db("BMRC").collection("Member");
    const alumniCollection = client.db("BMRC").collection("Alumni");

    //Get All News
    app.get("/event", async (req, res) => {
      const event = await eventCollection.find().toArray();
      res.send(event);
    });

    app.get("/event/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const event = await eventCollection.findOne(query);
      res.send(event);
    });

    app.post("/event", async (req, res) => {
      const event = req.body;
      const event_add = await eventCollection.insertOne(event);
      res.send(event_add);
    });

    app.delete("/event/:_id", async (req, res) => {
      const id = req.params._id;
      const filter = { _id: ObjectId(id) };
      const result = await eventCollection.deleteOne(filter);
      res.send(result);
    });


    app.put(`/event/:id`, async (req, res) => {
      const id = req.params.id;
      const updatedProduct = req.body;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          title: updatedProduct.title,
          description: updatedProduct.description
        },
      };
      const result = await data.updateOne(filter, updatedDoc, options);
      res.send(result);
    });



  } 
  
  finally {


  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(port, () => {
  console.log(`Server is working ${port}`);
});
