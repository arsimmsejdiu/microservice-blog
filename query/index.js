import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const posts = {};

app.get("/posts", (req, res) => {
    res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = {
      id,
      title,
      comments: [],
    };
  }

  if (type === "CommentCreated") {
    const { id, content, postId } = data;
   const post = posts[postId];
   post.comments.push({ id, content });
  }

  console.log(posts);
  res.send({});
});

const PORT = process.env.PORT || 4002;

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
