const images = [
  "🍎", "🍌", "🍇", "🍉", "🍓", "🥝", "🍍", "🥥"
];

let board = document.getElementById("memory-board");
let scoreElement = document.getElementById("score");

let score = 0;
let selected = [];
let locked = false;

function gerarPairs() {
  return [...images, ...images].sort(() => Math.random() - 0.5);
}

function createTable() {
  board.innerHTML = "";
  selected = [];
  locked = false;

  const pares = gerarPairs();

  for (let i = 0; i < 4; i++) {
    const row = document.createElement("tr");

    for (let j = 0; j < 4; j++) {
      const index = i * 4 + j;
      const td = document.createElement("td");
      td.dataset.valor = pares[index];

      const card = document.createElement("div");
      card.classList.add("card");

      const front = document.createElement("div");
      front.classList.add("card-face", "front");
      front.textContent = pares[index];

      const back = document.createElement("div");
      back.classList.add("card-face", "back");

      card.appendChild(front);
      card.appendChild(back);
      td.appendChild(card);
      row.appendChild(td);

      td.addEventListener("click", () => handleClick(td));
    }

    board.appendChild(row);
  }
}

function handleClick(cell) {
  if (locked || cell.classList.contains("revealed") || cell.classList.contains("matched")) {
    return;
  }

  cell.classList.add("revealed");
  selected.push(cell);

  if (selected.length === 2) {
    locked = true;
    const [a, b] = selected;

    if (a.dataset.valor === b.dataset.valor) {
      a.classList.add("matched");
      b.classList.add("matched");
      score++;
      updateScore();
      selected = [];
      locked = false;

      if (document.querySelectorAll(".matched").length === 16) {
        setTimeout(() => {
          alert("Parabéns! Você venceu o jogo!");
          reiniciarJogo();
        }, 300);
      }
    } else {
      setTimeout(() => {
        a.classList.remove("revealed");
        b.classList.remove("revealed");
        selected = [];
        locked = false;
      }, 1000);
    }
  }
}

function updateScore() {
  scoreElement.textContent = `Pontos: ${score}`;
}

function reiniciarJogo() {
  score = 0;
  updateScore();
  createTable();
}

createTable();
