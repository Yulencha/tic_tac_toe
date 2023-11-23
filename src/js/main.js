// Инициализация игры: задание основных переменных
let player = "X";
let stepCount = 0;
const message = document.getElementById("message");
const gameElement = document.getElementById("game");
const resetButton = document.getElementById("reset-game");

// Возможные комбинации для победы
const winCombinations = [
  ["1", "2", "3"],
  ["1", "4", "7"],
  ["1", "5", "9"],
  ["2", "5", "8"],
  ["3", "6", "9"],
  ["3", "5", "7"],
  ["4", "5", "6"],
  ["7", "8", "9"],
];
// Массивы для хранения ходов каждого игрока
const playerXMoves = [];
const playerOMoves = [];

// Создание игрового поля
for (let i = 1; i <= 9; i++) {
  const block = document.createElement("div");
  block.className = "block";
  block.setAttribute("number", i);
  document.getElementById("game").appendChild(block);
}

// Установка обработчика событий на клик по игровому полю
gameElement.addEventListener("click", currentStep);
// Установка обработчика событий на кнопку сброса игры
resetButton.addEventListener("click", resetGame);

// Функция для обработки текущего хода
function currentStep(event) {
  let blockNumber = event.target.getAttribute("number");
  if (event.target.className === "block" && stepCount < 9) {
    if (!event.target.innerHTML) {
      event.target.innerHTML = player;
      player === "X" ? playerXMoves.push(blockNumber) : playerOMoves.push(blockNumber);

      // Проверка победы после каждого хода
      if (
        (playerOMoves.length > 2 || playerXMoves.length > 2) &&
        checkWin(player === "X" ? playerXMoves : playerOMoves)
      ) {
        gameElement.removeEventListener("click", currentStep);
        message.innerText = "Победил игрок " + player;
      } else {
        changePlayer();
        stepCount++;
        if (stepCount === 9) {
          message.innerText = "Ничья";
        } else {
          message.innerText = "Ходит игрок " + player;
        }
      }
    }
  }
}

// Функция для смены игрока
function changePlayer() {
  player = player === "X" ? "O" : "X";
}

// Функция проверки выигрышной комбинации
function checkWin(arr) {
  return winCombinations.some((combination) => combination.every((number) => arr.includes(number)));
}

// Функция сброса игры
function resetGame() {
  playerXMoves.length = 0;
  playerOMoves.length = 0;
  stepCount = 0;
  player = "X";
  message.innerText = "Ходит игрок " + player;
  Array.from(gameElement.children).forEach((child) => (child.innerText = ""));
  gameElement.addEventListener("click", currentStep);
}
