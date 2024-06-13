import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

app.post("/users", async (req, res) => {
  const { loginId, password } = req.body;
  const newUser = await prisma.user.create({
    data: {
      loginId,
      password,
    },
  });
  res.json(newUser);
});

app.get("/music", async (req, res) => {
  const music = await prisma.music.findMany();
  res.json(music);
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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
