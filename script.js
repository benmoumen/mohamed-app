let secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

const guessInput = document.getElementById('guessInput');
const guessButton = document.getElementById('guessButton');
const resetButton = document.getElementById('resetButton');
const message = document.getElementById('message');
const attemptsDisplay = document.getElementById('attempts');

function checkGuess() {
  const guess = Number(guessInput.value);

  if (!guessInput.value || guess < 1 || guess > 100) {
    message.textContent = 'Enter a number between 1 and 100!';
    message.className = 'message';
    return;
  }

  attempts++;
  attemptsDisplay.textContent = `Attempts: ${attempts}`;

  if (guess === secretNumber) {
    message.textContent = `🎉 Correct! It was ${secretNumber}!`;
    message.className = 'message correct';
    guessInput.disabled = true;
    guessButton.disabled = true;
  } else if (guess > secretNumber) {
    message.textContent = '📉 Too high! Try lower.';
    message.className = 'message too-high';
  } else {
    message.textContent = '📈 Too low! Try higher.';
    message.className = 'message too-low';
  }

  guessInput.value = '';
  guessInput.focus();
}

function resetGame() {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  attemptsDisplay.textContent = 'Attempts: 0';
  message.textContent = 'Make your first guess!';
  message.className = 'message';
  guessInput.value = '';
  guessInput.disabled = false;
  guessButton.disabled = false;
  guessInput.focus();
}

guessButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', resetGame);

guessInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    checkGuess();
  }
});
