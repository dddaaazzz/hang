document.addEventListener("DOMContentLoaded", () => {
    // Слова, связанные с маркетингом
    const words = ["брендинг", "таргетинг", "реклама", "стратегия", "конверсия", "позиционирование", "аналитика"];
    
    let selectedWord = words[Math.floor(Math.random() * words.length)];
    let displayWord = Array(selectedWord.length).fill("_").join(" ");
    let lives = 6;
    let wrongLetters = [];

    // DOM элементы
    const wordDisplay = document.getElementById('wordDisplay');
    const livesDisplay = document.getElementById('lives');
    const wrongLettersDisplay = document.getElementById('wrongLetters');
    const messageDisplay = document.getElementById('message');
    const guessBtn = document.getElementById('guessBtn');
    const letterInput = document.getElementById('letterInput');

    // Инициализация игры
    wordDisplay.innerHTML = displayWord;
    livesDisplay.innerHTML = lives;

    // Функция для обновления отображения слова
    const updateDisplayWord = (updatedWord) => {
        displayWord = updatedWord.split("").join(" ");
        wordDisplay.innerHTML = displayWord;
    };

    // Основная функция проверки буквы
    const guessLetter = () => {
        const letterInputValue = letterInput.value.toLowerCase();
        messageDisplay.innerHTML = ""; // Очистка сообщения

        if (letterInputValue === "" || letterInputValue.length !== 1) {
            messageDisplay.innerHTML = "Введите одну букву!";
            return;
        }

        if (wrongLetters.includes(letterInputValue) || displayWord.includes(letterInputValue)) {
            messageDisplay.innerHTML = "Эта буква уже была!";
            return;
        }

        let updatedWord = "";
        let isCorrect = false;

        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === letterInputValue) {
                updatedWord += letterInputValue;
                isCorrect = true;
            } else {
                updatedWord += displayWord[i * 2];
            }
        }

        if (isCorrect) {
            updateDisplayWord(updatedWord);
            if (!displayWord.includes("_")) {
                messageDisplay.innerHTML = "Поздравляем! Вы выиграли!";
                letterInput.disabled = true;
                guessBtn.disabled = true;
            }
        } else {
            wrongLetters.push(letterInputValue);
            lives--;
            wrongLettersDisplay.innerHTML = wrongLetters.join(", ");
            livesDisplay.innerHTML = lives;

            if (lives === 0) {
    messageDisplay.innerHTML = "You lost! The word was: " + selectedWord;
    letterInput.disabled = true;
    guessBtn.disabled = true;
            }
        }

        letterInput.value = ""; // Очистка поля ввода
    };

    // Обработка события нажатия кнопки
    guessBtn.addEventListener('click', guessLetter);

    // Позволяет запускать проверку при нажатии Enter
    letterInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            guessLetter();
        }
    });
});
