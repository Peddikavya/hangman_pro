const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const flowers = ["rose", "lily", "tulip", "daisy", "sunflower", "orchid", "daffodil", "hydrangea", "jasmine", "carnation"];
const randomFlower = flowers[Math.floor(Math.random() * flowers.length)];
let guessedFlower = "_".repeat(randomFlower.length);
const maxAttempts = 6;
let attemptsLeft = maxAttempts;
const guessedLetters = [];
function checkGuess(letter) {
    if (randomFlower.includes(letter)) {
        for (let i = 0; i < randomFlower.length; i++) {
            if (randomFlower[i] === letter) {
                guessedFlower = guessedFlower.substring(0, i) + letter + guessedFlower.substring(i + 1);
            }
        }
        console.log("Correct guess! Guessed flower so far: " + guessedFlower);
    } else {
        attemptsLeft--;
        console.log("Incorrect guess! Attempts left: " + attemptsLeft);
    }
    guessedLetters.push(letter);
    console.log("Guessed letters: " + guessedLetters.join(", "));
}
function checkWin() {
    if (guessedFlower === randomFlower) {
        console.log("Congratulations! You've guessed the flower: " + randomFlower);
        rl.close();
    } else if (attemptsLeft === 0) {
        console.log("Sorry, you've run out of attempts. The flower was: " + randomFlower);
        rl.close();
    }
}

function playGame() {
    console.log("Welcome to Hangman - Flower Edition!");
    console.log("Try to guess the flower name. You have " + maxAttempts + " attempts.");
    console.log("Guessed flower so far: " + guessedFlower);

    rl.on('line', (input) => {
        if (attemptsLeft > 0) {
            const guess = input.trim().toLowerCase();

            if (guess.length !== 1 || !/[a-z]/.test(guess)) {
                console.log("Please enter a single letter.");
                return;
            }

            if (guessedLetters.includes(guess)) {
                console.log("You've already guessed that letter.");
                return;
            }

            checkGuess(guess);
            checkWin();
        }
    });
}
playGame();
