async function carregarAlunos() {
  try {
    const response = await fetch('http://localhost:3000/alunos/listar');
    const alunos = await response.json();

    const tbody = document.querySelector('#tabela-alunos tbody');
    tbody.innerHTML = "";

    alunos.forEach(aluno => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${aluno.nome}</td>
        <td>${aluno.curso}</td>
        <td>${aluno.IRA}</td>
        <td><a href="editarAluno.html?id=${encodeURIComponent(aluno.id)}">Editar</a></td>
        <td><button onclick="excluirAluno(${aluno.id})">Excluir</button></td>
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

async function excluirAluno(id) {
  const confirmacao = confirm("Tem certeza que deseja excluir este aluno?");
  if (!confirmacao) return;

  try {
    const resposta = await fetch(`http://localhost:3000/alunos/${id}`, {
      method: 'DELETE'
    });

    const dados = await resposta.json();

    if (resposta.ok) {
      alert("Aluno excluído com sucesso!");
      carregarAlunos();
      carregarMedia();
    } else {
      alert(dados.erro || "Erro ao excluir aluno");
    }
  } catch (erro) {
    console.error("Erro ao excluir aluno:", erro);
    alert("Erro na comunicação com o servidor.");
  }
}

carregarAlunos();
carregarMedia();
