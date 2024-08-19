function showWelcomeMessages() {
    console.log("Welcome to my Number Guessing Game!");
    console.log("I have guessed a number between 1 and 100.");
    console.log("Can you guess what it is?");
}

const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Global variables for total
let totalGuesses = 0;
let totalSessions = 0;

function generateRandomNumber() {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    let userGuesses = 0; // Counter for the current session

    function askForGuess() {
        userGuesses++; // Increment guesses for this session

        readline.question("Write a number: ", function (input) {
            let userNumber = parseInt(input);

            if (isNaN(userNumber)) {
                console.log("Please enter a valid number!");
                askForGuess();
            } else if (userNumber === randomNumber) {
                totalGuesses += userGuesses; // Add session guesses to total guesses
                totalSessions++; // Increment the total number of sessions
                console.log(`Congratulations! You got it correct, the number was ${randomNumber}!`);
                console.log(`You took ${userGuesses} guesses to guess the correct number!`);
                readline.question("Would you like to play again? (Y/N): ", function (input) {
                    if (input.toLowerCase() === "y") {
                        generateRandomNumber(); // Start a new game
                    } else if (input.toLowerCase() === "n") {
                        let averageGuess = totalGuesses / totalSessions;
                        console.log("Thanks for playing!");
                        console.log(`Your average number of guesses per session was ${parseFloat(averageGuess)}`);
                        readline.close();
                    }
                });
            } else if (userNumber > randomNumber) {
                console.log("Your number is too high! Try again.");
                askForGuess();
            } else {
                console.log("Your number is too low! Try again.");
                askForGuess();
            }
        });
    }

    askForGuess();
}

showWelcomeMessages();
generateRandomNumber();
