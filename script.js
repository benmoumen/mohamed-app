let secretNumber = Math.floor(Math.random() * 200) + 1;
let attempts = 0;

const guessInput = document.getElementById('guessInput');
const guessButton = document.getElementById('guessButton');
const resetButton = document.getElementById('resetButton');
const message = document.getElementById('message');
const attemptsDisplay = document.getElementById('attempts');
const confettiCanvas = document.getElementById('confettiCanvas');
const confettiCtx = confettiCanvas.getContext('2d');
const confettiColors = ['#f94144', '#f3722c', '#f9c74f', '#90be6d', '#577590', '#277da1', '#f9844a'];

function launchConfetti() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;

  const pieces = [];
  for (let i = 0; i < 200; i++) {
    pieces.push({
      x: Math.random() * confettiCanvas.width,
      y: -20 - Math.random() * confettiCanvas.height,
      width: Math.random() * 8 + 4,
      height: Math.random() * 6 + 4,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      speedY: Math.random() * 3 + 2,
      speedX: Math.random() * 2 - 1,
      angle: Math.random() * Math.PI * 2,
      spin: Math.random() * 0.2 - 0.1
    });
  }

  const startTime = performance.now();
  const duration = 3500;

  function frame(now) {
    const elapsed = now - startTime;
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    pieces.forEach((piece) => {
      piece.y += piece.speedY;
      piece.x += piece.speedX;
      piece.angle += piece.spin;

      confettiCtx.save();
      confettiCtx.translate(piece.x, piece.y);
      confettiCtx.rotate(piece.angle);
      confettiCtx.fillStyle = piece.color;
      confettiCtx.fillRect(-piece.width / 2, -piece.height / 2, piece.width, piece.height);
      confettiCtx.restore();
    });

    if (elapsed < duration) {
      requestAnimationFrame(frame);
    } else {
      confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
  }

  requestAnimationFrame(frame);
}

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
    launchConfetti();
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
  confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
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
