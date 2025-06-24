const express = require("express");
const router = express.Router();
const AlunoService = require("../services/AlunoService");

router.get("/listar", (req, res) => {
  const lista = AlunoService.listar();
  res.json(lista);
});

router.post("/cadastrar", (req, res) => {
  const { nome, curso, IRA } = req.body;
  
  const aluno = AlunoService.cadastrar({ nome, curso, IRA });
  res.status(201).json({ mensagem: "Aluno cadastrado com sucesso", aluno });
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, curso, IRA } = req.body;

  const alunoAtualizado = AlunoService.atualizar(id, { nome, curso, IRA });

  res.json({ mensagem: "Aluno atualizado com sucesso", aluno: alunoAtualizado });
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const alunoRemovido = AlunoService.remover(id);

  res.json({ mensagem: "Aluno removido com sucesso", aluno: alunoRemovido });
});

module.exports = router;
