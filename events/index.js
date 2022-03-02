import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

app.post("/events", (req, res) => {
  const event = req.body;

  axios.post("http://localhost:4000/events", event);
  axios.post("http://localhost:4001/events", event);
  axios.post("http://localhost:4002/events", event);
  res.send({ status: "OK" });
});

const PORT = 2022;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
