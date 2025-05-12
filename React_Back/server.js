import express from "express";
import cors from "cors";
import { PrismaClient } from "./generated/prisma/index.js";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3001;

//criar dados
app.post("/cadastrados", async (req, res) => {
  try {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
      return res
        .status(400)
        .json({ error: "Email, nome e senha são obrigatórios" });
    }

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password,
        age: null, // Definindo age como null já que é opcional
      },
    });

    res.status(200).json(user);
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
});

//visualizar dados
app.get("/cadastrados", async (req, res) => {
  const users = await prisma.user.findMany();
  res.status(200).json(users);
});

//editar dados
app.put("/cadastrados/:id", async (req, res) => {
  try {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
      return res
        .status(400)
        .json({ error: "Email, nome e senha são obrigatórios" });
    }

    const user = await prisma.user.update({
      where: {
        id: req.params.id,
      },
      data: {
        email,
        name,
        password,
        age: null, // Definindo age como null já que é opcional
      },
    });

    res.status(200).json(user);
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.status(500).json({ error: "Erro ao atualizar usuário" });
  }
});

//deletar dados
app.delete("/cadastrados/:id", async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json({ message: "Usuário deletado com sucesso!" });
});

//localhost
const startServer = (port) => {
  app
    .listen(port, () => {
      console.log(`Server is running on port ${port}`);
    })
    .on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.log(`Port ${port} is busy, trying ${port + 1}`);
        startServer(port + 1);
      } else {
        console.error("Server error:", err);
      }
    });
};

startServer(port);

//monalisaess, dbUsers
