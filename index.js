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

    // //PRODUCT
    // app.get("/news", async (req, res) => {
    //   const news = await newsCollection.find().toArray();
    //   res.send(news);
    // });
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
