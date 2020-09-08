import express from "express";
import mongoose from "mongoose";
import Data from "./data.js";
import Videos from "./dbModel.js";

// app config
const app = express();
const port = 9000;

// middleware
app.use(express.json());

// DB config
const connection_url =
  "mongodb+srv://admin:password32286@cluster0.tpygo.mongodb.net/tiktok?retryWrites=true&w=majority";

mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
// api endpoints
app.get("/", (req, res) => res.status(200).send("Hello Word"));

app.get("/v1/posts", (req, res) => res.status(200).send(Data));

app.post("/v2/posts", (req, res) => {
  const dbVideos = req.body;
  Videos.create(dbVideos, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

// listen
app.listen(port, () => console.log(`listen on localhost: ${port}`));
