let secretNumber = Math.floor(Math.random() * 200) + 1;
let attempts = 0;

const guessInput = document.getElementById('guessInput');
const guessButton = document.getElementById('guessButton');
const resetButton = document.getElementById('resetButton');
const message = document.getElementById('message');
const attemptsDisplay = document.getElementById('attempts');

function checkGuess() {
  const guess = Number(guessInput.value);

  if (!guessInput.value || guess < 1 || guess > 200) {
    message.textContent = 'Enter a number between 1 and 200!';
    message.className = 'message';
    return;
  }

  attempts++;
  attemptsDisplay.textContent = `Attempts: ${attempts}`;

  if (guess === secretNumber) {
    message.textContent = `🎉 You win! It was ${secretNumber}!`;
    message.className = 'message correct';
    document.body.classList.remove('wrong-guess');
    document.body.classList.add('correct-guess');
    guessInput.disabled = true;
    guessButton.disabled = true;
  } else if (guess > secretNumber) {
    message.textContent = '📉 Too high! Try lower.';
    message.className = 'message too-high';
    document.body.classList.remove('correct-guess');
    document.body.classList.add('wrong-guess');
  } else {
    message.textContent = '📈 Too low! Try higher.';
    message.className = 'message too-low';
    document.body.classList.remove('correct-guess');
    document.body.classList.add('wrong-guess');
  }

  guessInput.value = '';
  guessInput.focus();
}

function resetGame() {
  secretNumber = Math.floor(Math.random() * 200) + 1;
  attempts = 0;
  attemptsDisplay.textContent = 'Attempts: 0';
  message.textContent = 'Make your first guess!';
  message.className = 'message';
  document.body.classList.remove('correct-guess', 'wrong-guess');
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
