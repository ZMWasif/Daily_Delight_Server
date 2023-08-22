const express = require("express");
const cors = require("cors");

require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;
/* middleware */
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mmkrisc.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const foodMenu = client.db("daily-delight").collection("foodMenu");

    app.get("/foodMenu", async (req, res) => {
      const query = {};
      const cursor = foodMenu.find(query);
      const menus = await cursor.toArray();
      res.send(menus);
    });
  } finally {
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello From Daily Delight !");
});

app.listen(port, () => {
  console.log(`Daily Delight listening on port" ${port}`);
});
