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
  const flipped = getFlipped();
  element.classList.add("flip");
  if (flipped && flipped !== element) {
    const elementImage = getBackImage(element);
    const flippedImage = getBackImage(flipped);
    if (elementImage === flippedImage) {
      pairFound(element, flipped);
    } else {
      pairNotFound(element, flipped);
      window.setTimeout(flipBack, 1000, element, flipped);
    }
  }
}

function validadeQuantity(quantity) {
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

// let cardQuantity;
// do {
//   cardQuantity = parseInt(prompt("Digite a quantidade de cartas (4 à 14):"));
// } while (!validadeQuantity(cardQuantity));
