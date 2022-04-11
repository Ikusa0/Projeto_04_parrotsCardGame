// =========================== STOPWATCH ==========================
const HTML_SECONDS = document.querySelector(".seconds");
const HTML_MILLISECONDS = document.querySelector(".milliseconds");
let seconds = 0;
let milliseconds = 0;
let interval;

function stopTimer() {
  clearInterval(interval);
}

function startTimer() {
  stopTimer();
  interval = setInterval(() => {
    milliseconds++;

    if (milliseconds > 99) {
      milliseconds = 0;
      seconds++;
    }

    HTML_SECONDS.innerHTML = `${seconds}`.padStart(2, "0");
    HTML_MILLISECONDS.innerHTML = `${milliseconds}`.padStart(2, "0");
  }, 10);
}

function resetTimer() {
  stopTimer();
  seconds = 0;
  milliseconds = 0;
  HTML_SECONDS.innerHTML = "00";
  HTML_MILLISECONDS.innerHTML = "00";
}
// ================================================================

// ====================== VARIÁVEIS GLOBAIS =======================
let clickCount = 0;
let cardQuantity;
// ================================================================

// ======================== AUX FUNCTIONS =========================
function winner() {
  return document.querySelectorAll(".found").length === cardQuantity;
}

function getFlipped() {
  return document.querySelector(".flip");
}

function getBackImage(element) {
  return element.querySelector(".back-face img").src;
}

function pairFound(card1, card2) {
  card1.classList.add("found");
  card1.classList.remove("flip");
  card2.classList.add("found");
  card2.classList.remove("flip");
}

function pairNotFound(card1, card2) {
  card1.classList.add("temp");
  card1.classList.remove("flip");
  card2.classList.add("temp");
  card2.classList.remove("flip");
}

function flipBack(card1, card2) {
  card1.classList.remove("temp");
  card2.classList.remove("temp");
}

function resetCardBoard(cardBoard) {
  cardBoard.innerHTML = "";
}

function insertCard(cardBoard, src) {
  cardBoard.innerHTML += `\
  <li onclick="selectCard(this)" class="card">
    <div class="front-face face">
      <img src="./src/img/front.png" alt="" />
    </div>
    <div class="back-face face">
       <img src="${src}" alt="" />
    </div>
  </li>`;
}

function comparator() {
  return Math.random() - 0.5;
}

function validateQuantity(quantity) {
  if (!quantity) {
    return false;
  }
  if (quantity % 2 === 1) {
    return false;
  }
  if (quantity < 4 || quantity > 14) {
    return false;
  }
  return true;
}
// ================================================================

// ====================== ON-CLICK FUNCTIONS ======================
function selectCard(element) {
  // Evita bug no clickCount caso clique muito rápido, também evita de selecionar uma carta que está virando
  if (element.classList.contains("found") || element.classList.contains("temp")) return;

  const flipped = getFlipped();
  element.classList.add("flip");

  if (flipped === element) return;

  if (flipped) {
    const elementImage = getBackImage(element);
    const flippedImage = getBackImage(flipped);
    if (elementImage === flippedImage) {
      pairFound(element, flipped);
    } else {
      pairNotFound(element, flipped);
      window.setTimeout(flipBack, 1000, element, flipped);
    }
  }

  clickCount++;

  if (winner()) {
    stopTimer();
    window.setTimeout(
      alert,
      500,
      `Você ganhou em ***${clickCount}*** rodadas!\nTempo gasto: ***${seconds}s e ${milliseconds}ms***`
    );
    window.setTimeout(restartGame, 500);
  }
}
// ================================================================

// ===================== MAIN FUNCTIONALITIES =====================
function restartGame() {
  if (prompt("Deseja reiniciar o jogo? (sim / não)") === "sim") {
    document.querySelectorAll(".found").forEach((element) => {
      element.classList.remove("found");
    });
    clickCount = 0;
    resetTimer();
    window.setTimeout(startGame, 500);
  }
}

function randomizeCards(quantity) {
  const cardBoard = document.querySelector("ul");
  let images = [
    "./src/img/bobrossparrot.gif",
    "./src/img/explodyparrot.gif",
    "./src/img/fiestaparrot.gif",
    "./src/img/metalparrot.gif",
    "./src/img/revertitparrot.gif",
    "./src/img/tripletsparrot.gif",
    "./src/img/unicornparrot.gif",
  ]
    .sort(comparator)
    .slice(0, quantity / 2);
  images = images.concat(images).sort(comparator);

  resetCardBoard(cardBoard);

  for (let i = 0; i < quantity; i++) {
    insertCard(cardBoard, images[i]);
  }
}

function startGame() {
  do {
    cardQuantity = parseInt(prompt("Digite a quantidade de cartas (4 à 14):"));
  } while (!validateQuantity(cardQuantity));

  randomizeCards(cardQuantity);
  startTimer();
}
// ================================================================

window.onload = startGame;
