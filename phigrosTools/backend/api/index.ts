import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

app.get("/test", (req, res) => {
    res.send({ title: "DESTRUCTION 3,2,1", difficulty: "IN", accuracy: 99.86 });
});

app.listen(3000, () => console.log("Server is running on port 3000."));
