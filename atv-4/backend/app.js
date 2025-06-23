const express = require("express");
const cors = require("cors");
const app = express();

const alunos = [
  {
    nome: "Ana Souza",
    curso: "Engenharia da Computação",
    IRA: 8.7
  },
  {
    nome: "Bruno Lima",
    curso: "Sistemas de Informação",
    IRA: 7.9
  },
  {
    nome: "Camila Ribeiro",
    curso: "Ciência da Computação",
    IRA: 9.1
  }
];

app.use(cors());

app.get("/alunos/listar", (req, res) => {
    res.json(alunos)
});

app.get("/alunos/media", (req, res) => {
    const totalIra = alunos.reduce((soma, aluno) => soma + aluno.IRA, 0);
    const mediaIra = totalIra / alunos.length;

    res.json({ media: mediaIra.toFixed(2) });
});

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000")
});