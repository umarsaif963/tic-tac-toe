let num = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let player = "❌";
let playing = false;
let mode = "multiplayer";

const menu = document.getElementById("menu");
const board = document.getElementById("board");
const status = document.getElementById("status");
const againBtn = document.getElementById("againBtn");
const homeBtn = document.getElementById("homeBtn");
const line = document.getElementById("line");
const lineEl = line.querySelector("line");
const cells = document.querySelectorAll(".cell");

document.getElementById("multiBtn").addEventListener("click", () => startGame("multiplayer"));
document.getElementById("computerBtn").addEventListener("click", () => startGame("computer"));
document.getElementById("exitBtn").addEventListener("click", () => {
  document.body.innerHTML = "";
  status.textContent = "Thanks for playing!";
});

againBtn.addEventListener("click", () => startGame(mode));

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
    if (mode === "computer" && player === "⭕") return;
    const index = Number(cell.dataset.index);
    if (num[index] !== index + 1) return;
    playMove(index);
  });
});

function playMove(index) {
  num[index] = player;
  cells[index].textContent = player;
  cells[index].classList.add("taken");
  if (win(player)) {
    playing = false;
    drawLine(getWinPattern(player));
    if (mode === "computer") {
      status.textContent = player === "❌" ? "You win!" : "Computer wins!";
    } else {
      status.textContent = `Player ${player} wins!`;
    }
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
  if (mode === "computer" && player === "⭕") {
    status.textContent = "Computer is thinking...";
    setTimeout(computerMove, 600);
  } else {
    status.textContent = mode === "computer" ? "Your turn" : `Player ${player}'s turn`;
  }
}

function computerMove() {
  if (!playing) return;
  playMove(findBestMove());
}

function findBestMove() {
  const empty = [];
  for (let i = 0; i < 9; i++) {
    if (num[i] === i + 1) empty.push(i);
  }
  for (const idx of empty) {
    if (wouldWin(idx, "⭕")) return idx;
  }
  for (const idx of empty) {
    if (wouldWin(idx, "❌")) return idx;
  }
  if (empty.includes(4)) return 4;
  const corners = [0, 2, 6, 8].filter((i) => empty.includes(i));
  if (corners.length) return corners[Math.floor(Math.random() * corners.length)];
  return empty[Math.floor(Math.random() * empty.length)];
}

function wouldWin(index, symbol) {
  const snapshot = num.slice();
  num[index] = symbol;
  const won = getWinPattern(symbol) !== null;
  num = snapshot;
  return won;
}

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

function startGame(gameMode) {
  mode = gameMode;
  num = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  player = "❌";
  playing = true;
  restoreBoard();
  menu.classList.add("hidden");
  board.classList.remove("hidden");
  status.textContent = mode === "computer" ? "Your turn" : "Player ❌'s turn";
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