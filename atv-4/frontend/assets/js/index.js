async function carregarAlunos() {
  try {
    const response = await fetch('http://localhost:3000/alunos/listar');
    const alunos = await response.json();

    const tbody = document.querySelector('#tabela-alunos tbody');

    alunos.forEach(aluno => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${aluno.nome}</td>
        <td>${aluno.curso}</td>
        <td>${aluno.IRA}</td>
      `;
      tbody.appendChild(tr);
    });
  } catch (erro) {
    console.error("Erro ao carregar alunos:", erro);
  }
}

async function carregarMedia() {
  try {
    const response = await fetch('http://localhost:3000/alunos/media');
    const dados = await response.json();

    document.getElementById('media').textContent = `Média do IRA: ${dados.media}`;
  } catch (erro) {
    console.error("Erro ao carregar média:", erro);
  }
}

carregarAlunos();
carregarMedia();
