const words = ["брендинг", "таргетинг", "реклама", "стратегия", "конверсия", "позиционирование", "аналитика"];
let selectedWord = words[Math.floor(Math.random() * words.length)];
let displayWord = Array(selectedWord.length).fill("_").join(" ");
let lives = 6;
let wrongLetters = [];

document.getElementById('wordDisplay').innerHTML = displayWord;
document.getElementById('lives').innerHTML = lives;

function guessLetter() {
    const letterInput = document.getElementById("letterInput").value.toLowerCase();
    let message = document.getElementById("message");
    message.innerHTML = "";

    if (letterInput === "" || letterInput.length !== 1) {
        message.innerHTML = "Введите одну букву!";
        return;
    }

    if (wrongLetters.includes(letterInput) || displayWord.includes(letterInput)) {
        message.innerHTML = "Эта буква уже была!";
        return;
    }

    let updatedWord = "";
    let isCorrect = false;

    for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] === letterInput) {
            updatedWord += letterInput;
            isCorrect = true;
        } else {
            updatedWord += displayWord[i * 2];
        }
    }

    if (isCorrect) {
        displayWord = updatedWord.split("").join(" ");
        document.getElementById('wordDisplay').innerHTML = displayWord;

        if (!displayWord.includes("_")) {
            message.innerHTML = "Поздравляем! Вы выиграли!";
            document.getElementById('letterInput').disabled = true;
        }
    } else {
        wrongLetters.push(letterInput);
        lives--;
        document.getElementById('wrongLetters').innerHTML = wrongLetters.join(", ");
        document.getElementById('lives').innerHTML = lives;

        if (lives === 0) {
            message.innerHTML = Вы проиграли! Загаданное слово было: ${selectedWord};
            document.getElementById('letterInput').disabled = true;
        }
    }

    document.getElementById("letterInput").value = "";
}