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

    const aluno = new Aluno(
        json.nome,
        json.curso,
        json.IRA,
    );

    alunos.push(aluno);

    res.status(201).json({ mensagem: "Aluno cadastrado com sucesso", aluno: aluno });
});

module.exports = router;