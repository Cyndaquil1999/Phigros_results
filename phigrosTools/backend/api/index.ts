import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

app.get("/test", (req, res) => {
  res.send({
    title: "DESTRUCTION 3,2,1",
    composer: "Normal1zer vs. Broken Nerdz",
    difficulty: "IN",
    scoreConstant: 15.8,
    accuracy: 99.86,
  });
});

app.listen(3000, () => console.log("Server is running on port 3000."));
