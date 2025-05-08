const flowers = ["rose", "lily", "tulip", "daisy", "sunflower", "orchid", "daffodil", "hydrangea", "jasmine", "carnation"];
const randomFlower = flowers[Math.floor(Math.random() * flowers.length)];
let guessedFlower = "_".repeat(randomFlower.length);
const maxAttempts = 6;
let attemptsLeft = maxAttempts;
const guessedLetters = [];

document.getElementById("guessedFlower").textContent = guessedFlower;
document.getElementById("attemptsLeft").textContent = attemptsLeft;

function updateDisplay() {
    document.getElementById("guessedFlower").textContent = guessedFlower;
    document.getElementById("attemptsLeft").textContent = attemptsLeft;
    document.getElementById("guessedLetters").textContent = guessedLetters.join(", ");
}

function makeGuess() {
    const input = document.getElementById("guessInput");
    const letter = input.value.toLowerCase();
    input.value = "";

    if (!/^[a-z]$/.test(letter)) {
        alert("Please enter a single alphabet letter.");
        return;
    }

    if (guessedLetters.includes(letter)) {
        alert("You already guessed that letter.");
        return;
    }

    guessedLetters.push(letter);

    if (randomFlower.includes(letter)) {
        for (let i = 0; i < randomFlower.length; i++) {
            if (randomFlower[i] === letter) {
                guessedFlower = guessedFlower.substring(0, i) + letter + guessedFlower.substring(i + 1);
            }
        }
        document.getElementById("status").textContent = "Correct guess!";
    } else {
        attemptsLeft--;
        document.getElementById("status").textContent = "Incorrect guess!";
    }

    updateDisplay();
    checkWin();
}

function checkWin() {
    if (guessedFlower === randomFlower) {
        document.getElementById("status").textContent = "🎉 You guessed the flower: " + randomFlower;
        disableInput();
    } else if (attemptsLeft === 0) {
        document.getElementById("status").textContent = "😞 You lost! The flower was: " + randomFlower;
        disableInput();
    }
}

function disableInput() {
    document.getElementById("guessInput").disabled = true;
}
