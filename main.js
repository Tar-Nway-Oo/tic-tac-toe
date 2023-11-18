const cells = document.querySelectorAll(".cell");
const currStatus = document.querySelector("#current");
const winningText = document.querySelector("#winner");
const restartButton = document.querySelector("#restart");
let turn = "O";
currStatus.textContent = turn;

const combos = [
   [0,1,2],
   [3,4,5],
   [6,7,8],
   [0,3,6],
   [1,4,7],
   [2,5,8],
   [0,4,8],
   [2,4,6]
];

cells.forEach(cell => {
   cell.addEventListener("click", markCell);
});

function markCell(event) {
  const targetValue = event.target;
   targetValue.textContent = turn;
   if (turn === "O") {
      targetValue.classList.add("O");
   }else {
      targetValue.classList.add("X");
   }
   turn = turn === "O" ? "X" : "O";
   currStatus.textContent = turn;
   targetValue.removeEventListener("click", markCell);
   checkWinner();
}

function checkWinner() {
   combos.forEach(combo => {
     const WinnerO = combo.every(c => cells[c].textContent == "O");
     const WinnerX = combo.every(c => cells[c].textContent == "X");
     if (WinnerO) {
      winningText.textContent = "O Wins!";
      restartGame();
     } else if (WinnerX) {
      winningText.textContent = "X Wins!";
      restartGame();
     }
   });
}

function restartGame() {
   cells.forEach(cell => {
      cell.removeEventListener("click", markCell);
   });
   restartButton.classList.remove("visually-hidden");
   restartButton.addEventListener("click", () => {
      cells.forEach(cell => {
         cell.textContent = "";
         cell.classList = "cell";
         cell.addEventListener("click", markCell);
         restartButton.classList.add("visually-hidden");
      });
      winningText.textContent = "";
   });
}