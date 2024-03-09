import express from "express";
import cors from "cors";
const app = express();
const port = process.env.PORT || 5000;
import Replicate from "replicate";
import dotenv from "dotenv";
dotenv.config();

app.use(cors());
app.use(express.json());

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

app.get("/", (req, res) => {
  res.send("Server is running for chat boat");
});

app.post("/prediction", async (req, res) => {
  try {
    const body = req.body;
    const output = await replicate.run(process.env.MODEL, {
      input: body,
    });
    res.send(output);
  } catch (error) {
    res.send("Something went wrong");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
