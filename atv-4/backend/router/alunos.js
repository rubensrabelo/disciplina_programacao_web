const express = require("express");
const router = express.Router();
const alunos = require("../data/dados")
const Aluno = require("../model/aluno");

router.get("/listar", (req, res) => {
    res.json(alunos)
});

router.get("/media", (req, res) => {
    const totalIra = alunos.reduce((soma, aluno) => soma + aluno.IRA, 0);
    const mediaIra = totalIra / alunos.length;

    res.json({ media: mediaIra.toFixed(2) });
});

router.post("/cadastrar", (req, res) => {
    const json = req.body;
    let id = (alunos[alunos.length - 1].id) + 1;

    const aluno = new Aluno(
        id++,
        json.nome,
        json.curso,
        json.IRA,
    );

    alunos.push(aluno);

    res.status(201).json({ mensagem: "Aluno cadastrado com sucesso", aluno: aluno });
});

router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, curso, IRA } = req.body;

    if (!nome || !curso || IRA === undefined) {
        return res.status(400).json({ erro: 'Campos obrigatórios: nome, curso, IRA' });
    }

    const index = alunos.findIndex(a => a.id === id);

    if (index === -1) {
        return res.status(404).json({ erro: 'Aluno não encontrado' });
    }

    alunos[index] = {
        id,
        nome,
        curso,
        IRA: parseFloat(IRA)
    };

    res.json({ mensagem: 'Aluno atualizado com sucesso', aluno: alunos[index] });
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = alunos.findIndex(a => a.id === id);

  if (index === -1) {
    return res.status(404).json({ erro: 'Aluno não encontrado' });
  }

  const alunoRemovido = alunos.splice(index, 1)[0];

  res.json({ mensagem: 'Aluno removido com sucesso', aluno: alunoRemovido });
});


module.exports = router;