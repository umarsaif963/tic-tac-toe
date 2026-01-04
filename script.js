let num = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let player = "❌";
let playing = false;

const menu = document.getElementById("menu");
const board = document.getElementById("board");
const status = document.getElementById("status");
const againBtn = document.getElementById("againBtn");
const homeBtn = document.getElementById("homeBtn");
const line = document.getElementById("line");
const lineEl = line.querySelector("line");
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
      drawLine(getWinPattern(player));
      status.textContent = `Player ${player} wins!`;
      status.classList.remove("hidden");
      againBtn.classList.remove("hidden");
      homeBtn.classList.remove("hidden");
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
  line.classList.add("hidden");
}

function drawLine(pattern) {
  const centers = [
    [50, 50], [158, 50], [266, 50],
    [50, 158], [158, 158], [266, 158],
    [50, 266], [158, 266], [266, 266]
  ];
  const start = centers[pattern[0]];
  const end = centers[pattern[2]];
  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const ext = 28;
  lineEl.setAttribute("x1", start[0] - (dx / len) * ext);
  lineEl.setAttribute("y1", start[1] - (dy / len) * ext);
  lineEl.setAttribute("x2", end[0] + (dx / len) * ext);
  lineEl.setAttribute("y2", end[1] + (dy / len) * ext);
  line.classList.remove("hidden");
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
  return getWinPattern(currentPlayer) !== null;
}

function getWinPattern(currentPlayer) {
  let possibilities = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (let i = 0; i < possibilities.length; i++) {
    if (num[possibilities[i][0]] === currentPlayer &&
        num[possibilities[i][1]] === currentPlayer &&
        num[possibilities[i][2]] === currentPlayer) {
      return possibilities[i];
    }
  }
  return null;
}