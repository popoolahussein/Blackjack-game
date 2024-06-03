const messageEl = document.getElementById('message-el');
const cardsEl = document.getElementById('cards');
const sumEl = document.getElementById('add-it');
const playerEl = document.getElementById('cash-out');

const player = {
  name: 'Per',
  chips: 200,
};

let cards = [];
let sum = 0;
let gotBlackJack = false;
let onLine = false;
let note = '';

playerEl.textContent = `${player.name}: $${player.chips}`;

function getRandomCard() {
  const randomNumber = Math.floor(Math.random() * 13) + 1;
  if (randomNumber > 10) {
    return 10;
  }
  if (randomNumber === 1) {
    return 11;
  }
  return randomNumber;
}

function renderGame() {
  cardsEl.textContent = 'Cards: ';
  for (let i = 0; i < cards.length; i += 1) {
    cardsEl.textContent += `${cards[i]} `;
  }

  sumEl.textContent = `Sum: ${sum}`;
  if (sum <= 20) {
    note = 'Do you want to draw a new card?';
    messageEl.style.color = 'yellow';
  } else if (sum === 21) {
    note = "You've got Blackjack!";
    messageEl.style.color = 'greenyellow';
    gotBlackJack = true;
  } else {
    note = "You're out of the game!";
    messageEl.style.color = 'red';
    onLine = false;
  }
  messageEl.textContent = note;
}

function startGame() {
  onLine = true;
  gotBlackJack = false;
  const firstCard = getRandomCard();
  const secondCard = getRandomCard();
  cards = [firstCard, secondCard];
  sum = firstCard + secondCard;
  renderGame();
}

function newCard() {
  if (onLine && !gotBlackJack) {
    const card = getRandomCard();
    sum += card;
    cards.push(card);
    renderGame();
  }
}

window.startGame = startGame;
window.newCard = newCard;
