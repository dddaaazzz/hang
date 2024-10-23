document.addEventListener("DOMContentLoaded", () => {
    const words = ["брендинг", "таргетинг", "реклама", "стратегия", "конверсия", "позиционирование", "аналитика"];
    
    let selectedWord = words[Math.floor(Math.random() * words.length)];
    let displayWord = Array(selectedWord.length).fill("_");
    let lives = 6;
    let wrongLetters = [];

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

    // Инициализация игры
    updateDisplayWord();
    updateLives();

    const updateDisplayWord = () => {
        wordDisplay.innerHTML = displayWord.join(" ");
    };

    const updateLives = () => {
        livesDisplay.innerHTML = lives;
    };

    const guessLetter = () => {
        const letterInputValue = letterInput.value.toLowerCase();
        messageDisplay.innerHTML = ""; // Очистка сообщения

        // Проверка на пустой ввод или длину
        if (letterInputValue === ""  letterInputValue.length !== 1  !/^[а-яА-ЯёЁ]$/.test(letterInputValue)) {
            messageDisplay.innerHTML = "Введите одну букву на кириллице!";
            return;
        }

        // Проверка, была ли уже введена буква
        if (wrongLetters.includes(letterInputValue) || displayWord.includes(letterInputValue)) {
            messageDisplay.innerHTML = "Эта буква уже была угадана!";
            return;
        }

        let isCorrect = false;

        // Проверка буквы в загаданном слове
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === letterInputValue) {
                displayWord[i] = letterInputValue;  // Обновляем слово
                isCorrect = true;
            }
        }

        if (isCorrect) {
            updateDisplayWord(); // Обновляем отображение слова на экране
            // Проверяем, угадано ли всё слово
            if (!displayWord.includes("_")) {
                messageDisplay.innerHTML = "Поздравляю! Вы выиграли!";
                letterInput.disabled = true;
                guessBtn.disabled = true;
            }
        } else {
            // Если буква неправильная
            wrongLetters.push(letterInputValue);
            lives--;
            wrongLettersDisplay.innerHTML = wrongLetters.join(", ");
            updateLives(); // Обновляем отображение жизней

            // Показываем часть виселицы
            if (lives > 0) {
                hangmanParts[6 - lives].style.display = "block";
            }

            // Проверка на проигрыш
            if (lives === 0) {
                messageDisplay.innerHTML = Вы проиграли! Загаданное слово было: ${selectedWord};
                letterInput.disabled = true;
                guessBtn.disabled = true;
            }
        }

        letterInput.value = ""; // Очистка поля ввода
    };

    guessBtn.addEventListener('click', guessLetter);

    letterInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            guessLetter();
        }
    });
});
