// --------------------------- STOPWATCH --------------------------
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
  HTML_SECONDS.innerHTML = `${seconds}`.padStart(2, "0");
  HTML_MILLISECONDS.innerHTML = `${milliseconds}`.padStart(2, "0");
}
// ----------------------------------------------------------------

// ---------------------- VARIÁVEIS GLOBAIS -----------------------
let clickCount = 0;
let cardQuantity = 14;
let won = false;
// ----------------------------------------------------------------

function restartGame() {
  if (prompt("Deseja reiniciar o jogo?") === "sim") {
    document.querySelectorAll(".found").forEach((element) => {
      element.classList.remove("found");
      clickCount = 0;
      won = false;
    });

    resetTimer();
    startTimer();
  }
}

function getFoundCount() {
  return document.querySelectorAll(".found").length;
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

function selectCard(element) {
  // Evita bug no clickCount caso clique muito rápido, também evita de selecionar uma carta que está virando
  if (!element.classList.contains("found") && !element.classList.contains("temp")) {
    const flipped = getFlipped();
    element.classList.add("flip");

    if (flipped !== element) {
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

      if (!won) {
        clickCount++;
        if (getFoundCount() === cardQuantity) {
          stopTimer();
          won = true;
          window.setTimeout(
            alert,
            500,
            `Você ganhou em ***${clickCount}*** rodadas!\nTempo gasto: ***${seconds}s e ${milliseconds}ms***`
          );
          window.setTimeout(restartGame, 500);
        }
      }
    }
  }
}

// function validateQuantity(quantity) {
//   if (!quantity) {
//     return false;
//   }
//   if (quantity % 2 === 1) {
//     return false;
//   }
//   if (quantity < 4 || quantity > 14) {
//     return false;
//   }
//   return true;
// }

// let cardQuantity;
// do {
//   cardQuantity = parseInt(prompt("Digite a quantidade de cartas (4 à 14):"));
// } while (!validadeQuantity(cardQuantity));

startTimer();
