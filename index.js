document.addEventListener("DOMContentLoaded", () => {
    // Слова, связанные с маркетингом на кириллице
    const words = ["брендинг", "таргетинг", "реклама", "стратегия", "конверсия", "позиционирование", "аналитика"];
    
    let selectedWord = words[Math.floor(Math.random() * words.length)];
    let displayWord = Array(selectedWord.length).fill("_");
    let lives = 6;
    let wrongLetters = [];

    // DOM элементы
    const wordDisplay = document.getElementById('wordDisplay');
    const livesDisplay = document.getElementById('lives');
    const wrongLettersDisplay = document.getElementById('wrongLetters');
    const messageDisplay = document.getElementById('message');
    const guessBtn = document.getElementById('guessBtn');
    const letterInput = document.getElementById('letterInput');

    // Части тела виселицы
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
    wordDisplay.innerHTML = displayWord.join(" ");
    livesDisplay.innerHTML = lives;

    // Функция для обновления отображения слова
    const updateDisplayWord = () => {
        wordDisplay.innerHTML = displayWord.join(" ");
    };

    // Основная функция проверки буквы
    const guessLetter = () => {
        const letterInputValue = letterInput.value.toLowerCase();
        messageDisplay.innerHTML = ""; // Очистка сообщения

        // Проверка на пустой ввод или длину
        if (letterInputValue === "" || letterInputValue.length !== 1) {
            messageDisplay.innerHTML = "Введите одну букву!";
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
            if (!displayWord.includes("_")) {
                messageDisplay.innerHTML = "Поздравляю! Вы выиграли!";
                letterInput.disabled = true;
                guessBtn.disabled = true;
            }
        } else {
            // Если буква неправильная, добавляем в массив wrongLetters, уменьшаем жизни и рисуем виселицу
            wrongLetters.push(letterInputValue);
            lives--;
            wrongLettersDisplay.innerHTML = wrongLetters.join(", ");
            livesDisplay.innerHTML = lives;

            // Показываем часть виселицы
            hangmanParts[6 - lives].style.display = "block";

            if (lives === 0) {
                messageDisplay.innerHTML = `Вы проиграли! Загаданное слово было: ${selectedWord}`;
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
