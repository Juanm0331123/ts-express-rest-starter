import express from "express";
const app = express();
app.use(express.json());

const PORT = 3000;

app.get("/ping", (_req, res) => {
  console.log("Ping received");
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
