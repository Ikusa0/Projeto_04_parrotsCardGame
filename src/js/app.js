function rotateCard(element) {
  element.classList.toggle("rotate");
}

function validadeQuantity(quantity) {
  if (!quantity){
    return false
  }
  if (quantity % 2 === 1) {
    return false;
  }
  if (quantity < 4 || quantity > 14) {
    return false;
  }
  return true;
}

do {
  cardQuantity = parseInt(prompt("Digite a quantidade de cartas (4 à 14):"));
} while (!validadeQuantity(cardQuantity));

