let num = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let player = "❌";
let playing = false;

const menu = document.getElementById("menu");
const board = document.getElementById("board");
const status = document.getElementById("status");
const againBtn = document.getElementById("againBtn");
const homeBtn = document.getElementById("homeBtn");
const cells = document.querySelectorAll(".cell");

document.getElementById("playBtn").addEventListener("click", startGame);
document.getElementById("exitBtn").addEventListener("click", () => {
  document.body.innerHTML = "";
  status.textContent = "Thanks for playing!";
});

againBtn.addEventListener("click", () => {
  num = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  restoreBoard();
  startGame();
});

homeBtn.addEventListener("click", () => {
  menu.classList.remove("hidden");
  board.classList.add("hidden");
  againBtn.classList.add("hidden");
  status.classList.add("hidden");
  homeBtn.classList.add("hidden");
  playing = false;
});

cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (!playing) return;
    const index = Number(cell.dataset.index);
    if (num[index] !== index + 1) return;
    num[index] = player;
    cell.textContent = player;
    cell.classList.add("taken");
    if (win(player)) {
      playing = false;
      status.textContent = `Player ${player} wins!`;
      status.classList.remove("hidden");
      againBtn.classList.remove("hidden");
      homeBtn.classList.remove("hidden");
      cells.forEach((c) => {
        if (c.textContent === player) c.classList.add("winner");
      });
      return;
    }
    if (num.every((v) => typeof v === "string")) {
      playing = false;
      status.textContent = "Game Draw!";
      status.classList.remove("hidden");
      againBtn.classList.remove("hidden");
      homeBtn.classList.remove("hidden");
      return;
    }
    player = player === "❌" ? "⭕" : "❌";
    status.textContent = `Player ${player}'s turn`;
  });
});

function restoreBoard() {
  cells.forEach((cell) => {
    cell.textContent = Number(cell.dataset.index) + 1;
    cell.classList.remove("taken", "winner");
  });
}

function startGame() {
  num = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  player = "❌";
  playing = true;
  restoreBoard();
  menu.classList.add("hidden");
  board.classList.remove("hidden");
  status.textContent = `Player ${player}'s turn`;
  status.classList.remove("hidden");
  againBtn.classList.add("hidden");
  homeBtn.classList.add("hidden");
}

function win(currentPlayer) {
  let possibilities = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (let i = 0; i < possibilities.length; i++) {
    if (num[possibilities[i][0]] === currentPlayer &&
        num[possibilities[i][1]] === currentPlayer &&
        num[possibilities[i][2]] === currentPlayer) {
      return true;
    }
  }
  return false;
}