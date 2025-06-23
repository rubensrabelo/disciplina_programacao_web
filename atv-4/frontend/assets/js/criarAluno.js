const form = document.getElementById('form-aluno');
const mensagem = document.getElementById('mensagem');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const curso = document.getElementById('curso').value;
  const ira = document.getElementById('ira').value;

  try {
    const resposta = await fetch('http://localhost:3000/alunos/cadastrar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome, curso, IRA: ira })
    });

    const dados = await resposta.json();

    if (resposta.ok) {
      mensagem.textContent = dados.mensagem;
      form.reset();
    } else {
      mensagem.textContent = dados.erro || 'Erro ao cadastrar.';
    }
  } catch (erro) {
    mensagem.textContent = 'Erro ao conectar com o servidor.';
    console.error(erro);
  }
});
