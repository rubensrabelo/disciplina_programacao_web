const alunos = require("../data/dados");
const Aluno = require("../model/aluno");

class AlunoService {
  static listar() {
    return alunos;
  }

  static cadastrar({ nome, curso, IRA }) {
    const id = alunos.length > 0 ? alunos[alunos.length - 1].id + 1 : 1;
    const aluno = new Aluno(id, nome, curso, parseFloat(IRA));

    alunos.push(aluno);
    
    return aluno;
  }

  static atualizar(id, { nome, curso, IRA }) {
    const index = alunos.findIndex(a => a.id === id);
    
    if (index === -1) return null;

    alunos[index] = { id, nome, curso, IRA: parseFloat(IRA) };
    
    return alunos[index];
  }

  static remover(id) {
    const index = alunos.findIndex(a => a.id === id);
    if (index === -1) return null;

    const removido = alunos.splice(index, 1)[0];
    return removido;
  }
}

module.exports = AlunoService;
