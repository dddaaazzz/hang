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
    const letterInput = document.getElementById('letterInput');
    const guessBtn = document.getElementById('guessBtn');
    const restartBtn = document.getElementById('restartBtn');

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
        hangmanParts.forEach(part => part.classList.remove('show'));
        updateDisplayWord();
        updateLives();
        updateWrongLetters();
        messageDisplay.textContent = "";
        letterInput.value = "";
        letterInput.disabled = false;
        guessBtn.disabled = false;
        restartBtn.disabled = true;
    };

    const updateDisplayWord = () => {
        wordDisplay.textContent = displayWord.join(" ");
    };

    const updateLives = () => {
        livesDisplay.textContent = lives;
    };

    const updateWrongLetters = () => {
        wrongLettersDisplay.textContent = wrongLetters.join(", ");
    };

    const guessLetter = () => {
        const letter = letterInput.value.toLowerCase();
        if (!letter || letter.length !== 1 || !letter.match(/[а-я]/i)) {
            messageDisplay.textContent = "Пожалуйста, введите одну букву кириллицы.";
            return;
        }
        if (guessedLetters.includes(letter)) {
            messageDisplay.textContent = "Вы уже пробовали эту букву.";
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
                messageDisplay.textContent = "Поздравляем! Вы угадали слово!";
                letterInput.disabled = true;
                guessBtn.disabled = true;
                restartBtn.disabled = false;
            }
        } else {
            lives--;
            wrongLetters.push(letter);
            hangmanParts[6 - lives].classList.add('show');
            updateLives();
            updateWrongLetters();
            if (lives === 0) {
                messageDisplay.textContent = `Вы проиграли! Слово было: ${selectedWord}`;
                letterInput.disabled = true;
                guessBtn.disabled = true;
                restartBtn.disabled = false;
            }
        }
        letterInput.value = "";
    };

    guessBtn.addEventListener('click', guessLetter);
    restartBtn.addEventListener('click', startGame);
    startGame();
});
