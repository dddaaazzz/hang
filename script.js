const words = ["маркетинг", "продажи", "статистика", "метрики", "анализ", "реклама", "креатив", "ребрендинг"];
let word = "";
let guessedWord = [];
let wrongLetters = [];
let attemptsLeft = 6;

function initializeGame() {
    word = words[Math.floor(Math.random() * words.length)];
    guessedWord = Array(word.length).fill("_");
    wrongLetters = [];
    attemptsLeft = 6;
    updateDisplay();
    document.getElementById("message").textContent = "";
}

function updateDisplay() {
    document.getElementById("wordDisplay").textContent = guessedWord.join(" ");
    document.getElementById("wrongLetters").textContent = wrongLetters.join(", ");
    document.getElementById("attemptsLeft").textContent = attemptsLeft;
}

function guessLetter() {
    const letterInput = document.getElementById("letterInput");
    const letter = letterInput.value.toLowerCase();

    if (letter && !wrongLetters.includes(letter) && !guessedWord.includes(letter)) {
        if (word.includes(letter)) {
            for (let i = 0; i < word.length; i++) {
                if (word[i] === letter) {
                    guessedWord[i] = letter;
                }
            }
        } else {
            wrongLetters.push(letter);
            attemptsLeft--;
        }
    }

    letterInput.value = "";
    checkGameStatus();
    updateDisplay();
}

function checkGameStatus() {
    if (attemptsLeft === 0) {
        document.getElementById("message").textContent = `Вы проиграли! Загаданное слово было: ${word}`;
    } else if (!guessedWord.includes("_")) {
        document.getElementById("message").textContent = "Поздравляем! Вы угадали слово!";
    }
}

function restartGame() {
    initializeGame();
}

initializeGame();
