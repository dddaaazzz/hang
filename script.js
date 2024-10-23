HangmanGamescript.js
document.addEventListener("DOMContentLoaded", () => {
    const words = ["брендинг", "таргетинг", "реклама", "стратегия", "конверсия", "позиционирование", "аналитика"];

    let selectedWord = "";
    let displayWord = [];
    let lives = 6;
    let wrongLetters = [];
    let guessedLetters = [];

    const wordDisplay = document.getElementById('wordDisplay');
    const livesDisplay = document.getElementById('livesCount');
    const wrongLettersDisplay = document.getElementById('wrongLettersList');
    const messageDisplay = document.getElementById('message');
    const guessBtn = document.getElementById('guessBtn');
    const letterInput = document.getElementById('letterInput');

    const hangmanParts = [
        document.getElementById('gallows'),
        document.getElementById('head'),
        document.getElementById('body'),
        document.getElementById('leftArm'),
        document.getElementById('rightArm'),
        document.getElementById('leftLeg'),
        document.getElementById('rightLeg')
    ];

    const startGame = () => {
        selectedWord = words[Math.floor(Math.random() * words.length)];
        displayWord = Array(selectedWord.length).fill("_");
        lives = 6;
        wrongLetters = [];
        guessedLetters = [];
        hangmanParts.forEach(part => part.classList.remove('show')); // Hide hangman parts
        updateDisplayWord();
        updateLives();
        updateWrongLetters();
        messageDisplay.innerHTML = "";
        letterInput.value = "";
        letterInput.disabled = false;
        guessBtn.disabled = false;
    };

    const updateDisplayWord = () => {
        wordDisplay.innerHTML = displayWord.join(" ");
    };

    const updateLives = () => {
        livesDisplay.innerHTML = lives;
    };

    const updateWrongLetters = () => {
        wrongLettersDisplay.innerHTML = wrongLetters.join(", ");
    };

    const guessLetter = () => {
        const letter = letterInput.value.toLowerCase();

        // Input validation
        if (!letter || letter.length !== 1 || !letter.match(/[а-я]/i)) {
            messageDisplay.innerHTML = "Пожалуйста, введите одну букву кириллицы.";
            return;
        }

        if (guessedLetters.includes(letter)) {
            messageDisplay.innerHTML = "Вы уже пробовали эту букву.";
            return;
        }

        guessedLetters.push(letter);

        if (selectedWord.includes(letter)) {
            for (let i = 0; i < selectedWord.length; i++) {
                if (selectedWord[i] === letter) {
                    displayWord[i] = letter;
                }
            }
            updateDisplayWord();
            if (!displayWord.includes("_")) {
                messageDisplay.innerHTML = "Поздравляем! Вы угадали слово!";
                letterInput.disabled = true;
                guessBtn.disabled = true;
            }
        } else {
            lives--;
            wrongLetters.push(letter);
            hangmanParts[6 - lives].classList.add('show'); // Show hangman part
            updateLives();
            updateWrongLetters();
            if (lives === 0) {
                messageDisplay.innerHTML = `Вы проиграли! Слово было: ${selectedWord}`;
                letterInput.disabled = true;
                guessBtn.disabled = true;
            }
        }
        letterInput.value = "";
    };

    guessBtn.addEventListener('click', guessLetter);
    startGame(); // Start the game on page load
});
