import express from "express";
import { randomBytes } from "crypto";
import bodyParser from "body-parser";
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors())

const commentsByPostId = {};

app.get("/", (req, res) => {
  res.send(commentsByPostId);
});

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content });
  commentsByPostId[req.params.id] = comments;

  res.status(201).json(comments);
});

const PORT = 1002;

app.listen(PORT, () => {
  console.log(`[App] running on port ${PORT}`);
});
