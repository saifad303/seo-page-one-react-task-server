const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://seo_one_task:seo_one_task@cluster0.zwagdnz.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    client.connect();

    const incompleteTaskCollection = client
      .db("files")
      .collection("incomplete");

    const todoTaskCollection = client.db("files").collection("toDo");
    const doingTaskCollection = client.db("files").collection("doing");
    const underReviewTaskCollection = client
      .db("files")
      .collection("underReview");

    const completedTaskCollection = client.db("files").collection("completed");

    const overdoTaskCollection = client.db("files").collection("overdo");

    app.post("/uploadFileToIncomplete", (req, res) => {
      const fileNames = req.body.fileNames;
      const id = req.body.id;
      // console.log(data);

      const result = incompleteTaskCollection.updateOne(
        { _id: new ObjectId(id) },
        { $push: { files: { $each: fileNames } } }
      );

      res.send(result);
    });

    app.post("/uploadFileToTodo", (req, res) => {
      const fileNames = req.body.fileNames;
      const id = req.body.id;
      // console.log(data);

      const result = todoTaskCollection.updateOne(
        { _id: new ObjectId(id) },
        { $push: { files: { $each: fileNames } } }
      );

      res.send(result);
    });

    app.post("/uploadFileDoing", (req, res) => {
      const fileNames = req.body.fileNames;
      const id = req.body.id;
      // console.log(data);

      const result = doingTaskCollection.updateOne(
        { _id: new ObjectId(id) },
        { $push: { files: { $each: fileNames } } }
      );

      res.send(result);
    });

    app.post("/uploadFileUnderReview", (req, res) => {
      const fileNames = req.body.fileNames;
      const id = req.body.id;
      // console.log(req.body);

      const result = underReviewTaskCollection.updateOne(
        { _id: new ObjectId(id) },
        { $push: { files: { $each: fileNames } } }
      );

      res.send(result);
    });

    app.post("/uploadFileCompleted", (req, res) => {
      const fileNames = req.body.fileNames;
      const id = req.body.id;
      // console.log(req.body);

      const result = completedTaskCollection.updateOne(
        { _id: new ObjectId(id) },
        { $push: { files: { $each: fileNames } } }
      );

      res.send(result);
    });

    app.post("/uploadFileOverdo", (req, res) => {
      const fileNames = req.body.fileNames;
      const id = req.body.id;
      // console.log(req.body);

      const result = overdoTaskCollection.updateOne(
        { _id: new ObjectId(id) },
        { $push: { files: { $each: fileNames } } }
      );

      res.send(result);
    });

    //all get APIs

    app.get("/incomplete", async (req, res) => {
      const result = await incompleteTaskCollection.find().toArray();
      res.send(result);
    });

    app.get("/todo", async (req, res) => {
      const result = await todoTaskCollection.find().toArray();
      res.send(result);
    });

    app.get("/doing", async (req, res) => {
      const result = await doingTaskCollection.find().toArray();
      res.send(result);
    });

    app.get("/underreview", async (req, res) => {
      const result = await underReviewTaskCollection.find().toArray();
      res.send(result);
    });

    app.get("/completed", async (req, res) => {
      const result = await completedTaskCollection.find().toArray();
      res.send(result);
    });

    app.get("/overdo", async (req, res) => {
      const result = await overdoTaskCollection.find().toArray();
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("welcome api...");
});

app.listen(port, () => {
  console.log(`This port is running on port = ${port}`);
});
