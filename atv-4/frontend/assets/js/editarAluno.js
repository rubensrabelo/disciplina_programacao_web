const params = new URLSearchParams(window.location.search);
const id = params.get("id");

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch('http://localhost:3000/alunos/listar');
    const alunos = await response.json();
    const aluno = alunos.find(a => a.id == id);

    document.getElementById("nome").value = aluno.nome;
    document.getElementById("curso").value = aluno.curso;
    document.getElementById("ira").value = aluno.IRA;

  } catch (erro) {
    console.error("Erro ao carregar aluno:", erro);
  }
});

document.getElementById("form-editar").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const curso = document.getElementById("curso").value;
  const IRA = document.getElementById("ira").value;

  try {
    const resposta = await fetch(`http://localhost:3000/alunos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nome, curso, IRA })
    });

    const dados = await resposta.json();

    if (resposta.ok) {
      document.getElementById("mensagem").textContent = "Aluno atualizado com sucesso!";
      window.location.href = "visualizarAlunos.html";
    } else {
      document.getElementById("mensagem").textContent = dados.erro || "Erro ao atualizar.";
    }

  } catch (erro) {
    console.error("Erro ao atualizar aluno:", erro);
    document.getElementById("mensagem").textContent = "Erro ao conectar com o servidor.";
  }
});
