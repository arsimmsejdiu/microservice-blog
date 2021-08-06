import express from "express";
import { randomBytes } from "crypto";
import bodyParser from "body-parser";
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors())

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = { id, title };

  res.status(201).send(posts[id]);
});

const PORT = 1992;

app.listen(PORT, () => {
  console.log(`[App] running on port ${PORT}`);
});
