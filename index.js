const [colorSelector] = document.getElementsByTagName("input");

let player1, player2, bgcolor;

const startbtn = document.getElementById("start");

colorSelector.addEventListener("change", () => {
  document.documentElement.style.setProperty("--bg-color", colorSelector.value);
});

const boxes = Array.from(document.getElementsByClassName("box"));
const restartBtn = document.getElementById("restart");
const [heading] = document.getElementsByTagName("h1");

const X_TURN = "X";
const O_TURN = "O";

let currentPlayer = Math.floor(Math.random() * 2) ? X_TURN : O_TURN;
heading.innerHTML = `Turn = ${currentPlayer}`;

let spaces = Array(9).fill(null);
let counts_played = 0;

restartBtn.addEventListener("click", restart);

function startGame() {
  for (let box of boxes) {
    box.addEventListener("click", clicked);
  }
}

function clicked(e) {
  const id = e.target.id;
  if (
    !spaces[id] &&
    counts_played != 9 &&
    !checkWinner(spaces, currentPlayer)
  ) {
    spaces[id] = currentPlayer;
    e.target.innerHTML = spaces[id];
    if (checkWinner(spaces, currentPlayer)) {
      boxes.forEach((box) => (box.style.backgroundColor = "green"));
      heading.innerHTML = `Winner is ${currentPlayer}`;
      return 0;
    }
    currentPlayer = currentPlayer == X_TURN ? O_TURN : X_TURN;
    heading.innerHTML = `Turn = ${currentPlayer}`;
    counts_played++;
  }

  if (counts_played == 9 && !checkWinner(spaces, currentPlayer)) {
    heading.innerHTML = "DRAW";
    boxes.forEach((box) => (box.style.backgroundColor = "red"));
  }
}

function checkWinner(spaces, turn) {
  if (
    (spaces[0] == turn && spaces[1] == turn && spaces[2] == turn) ||
    (spaces[3] == turn && spaces[4] == turn && spaces[5] == turn) ||
    (spaces[6] == turn && spaces[7] == turn && spaces[8] == turn) ||
    (spaces[0] == turn && spaces[3] == turn && spaces[6] == turn) ||
    (spaces[1] == turn && spaces[4] == turn && spaces[7] == turn) ||
    (spaces[2] == turn && spaces[5] == turn && spaces[8] == turn) ||
    (spaces[0] == turn && spaces[4] == turn && spaces[8] == turn) ||
    (spaces[2] == turn && spaces[4] == turn && spaces[6] == turn)
  ) {
    return true;
  }
  return false;
}

function restart() {
  currentPlayer = Math.floor(Math.random() * 2) ? X_TURN : O_TURN;
  heading.innerHTML = `Turn = ${currentPlayer}`;
  boxes.forEach((box) => {
    box.style.backgroundColor = "";
    box.innerHTML = null;
  });
  spaces.fill(null);

  counts_played = 0;
}

startGame();
