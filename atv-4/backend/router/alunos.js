const express = require("express");
const router = express.Router();
const alunos = require("../data/dados")

router.get("/listar", (req, res) => {
    res.json(alunos)
});

router.get("/media", (req, res) => {
    const totalIra = alunos.reduce((soma, aluno) => soma + aluno.IRA, 0);
    const mediaIra = totalIra / alunos.length;

    res.json({ media: mediaIra.toFixed(2) });
});

module.exports = router;