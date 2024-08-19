// Import the mysql2 library
const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',       // Replace with your database host
  user: 'root',            // Replace with your database username
  password: '',            // Replace with your database password
  database: 'gamesdb'      // Replace with your database name
});

// Create readline interface for user input
const input = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  // Connection successful
});

// Messages for user interactions
const messages = {
  welcome: "Welcome to the game, please register before you play, if already registered type Login, otherwise type Register :)",
  mainmenu: "Main Menu",
  information: "Enter the following keys to access the respective menus",
  menunumbers: "1: Summary of logged in user games   2: Start new game   U: Update Account Data   D: Delete Account   X: Quit Program",
  guessingGameWelcome: "Welcome to the guessing game! I have picked a number between 1-100, guess the correct one and win 3 points!",
  playagain: "Would you like to play again? (Yes/No)",
  updateAccountWelcome: "Welcome! To change your account information, click N for Name   C for City   P for Password",
  nameUpdate: "Welcome, please enter your new name to save the changes!",
  changePassword: "Welcome, please enter your current password and then your new password to save the changes!",
  changeCity: "Hello, please enter your new city to save the changes!",
  deletionConfirmation: "Are you sure you want to delete your account? (Yes/No) ",
  accountDeleted: "Your account has been deleted!",
  deletionCancelled: "Deletion process cancelled.. returning to main menu"
};

// Error messages for input validation
const errorMessages = {
  nameTooShort: "Your name is too short, make sure it is above 3 characters!",
  nameTooLong: "Your name is too long, make sure it is below 16 characters!",
  passwordTooShort: "Your password is too short, it must be above 8 characters!",
  passwordTooLong: "Your password is too long, it must be below 32 characters!",
  cityTooShort: "Your city input must have more than 3 characters!",
  cityTooLong: "Your city must have less than 32 characters!"
};

// Function to handle the entry page with login or register options
function entryPage() {
  console.log(messages.welcome);

  // Prompt user for login or register choice
  input.question("Enter: ", (welcomeInput) => {
    if (welcomeInput.toLowerCase() === "login") {
      loginPage(); // Call login function
    } else if (welcomeInput.toLowerCase() === "register") {
      receivingUserInput(); // Call registration function
    } else {
      console.log("Invalid input, please write either Login or Register depending on your choice!");
      entryPage(); // Retry entry page
    }
  });
}
entryPage(); // Start the entry page by calling the function

// Function to display a summary of logged in user games
function summaryOfGames() {
  const queryGames = `SELECT * FROM Games WHERE PlayerID = ?`;

  connection.query(queryGames, [playerIDGames], (err, results) => {
    if (err) {
      console.error('Error running SQL query:', err.stack);
      return;
    }
    console.log('Games for Player ID ' + playerIDGames + ':', results);
    mainMenu(); // Return to main menu after summary
  });
}

// Function to handle user guesses and update guess count
function userGuesses() {
  const playerID = playerIDGames;

  // Query to retrieve the latest GameID for the current player
  const queryGetGameID = `SELECT GameID FROM Games WHERE PlayerID = ? ORDER BY GameID DESC LIMIT 1`;

  connection.query(queryGetGameID, [playerID], (err, results) => {
    if (err) {
      console.error('Error retrieving GameID:', err);
      return;
    }

    // Proceed only if there is a game for the player
    if (results.length > 0) {
      const gameID = results[0].GameID;

      // Retrieve the current guess count
      const queryGetGuesses = `SELECT NumberOfGuesses FROM PlayerGuesses WHERE PlayerID = ? AND GameID = ?`;

      connection.query(queryGetGuesses, [playerID, gameID], (err, results) => {
        if (err) {
          console.error('Error retrieving guess count:', err);
          return;
        }

        const currentGuesses = results.length > 0 ? results[0].NumberOfGuesses : 0;

        // Increment the guess count
        const newGuesses = currentGuesses + 1;

        // Update the PlayerGuesses table
        const queryUpdateGuesses = `UPDATE PlayerGuesses SET NumberOfGuesses = ? WHERE PlayerID = ? AND GameID = ?`;

        connection.query(queryUpdateGuesses, [newGuesses, playerID, gameID], (err) => {
          if (err) {
            console.error('Error updating guess count:', err);
            return;
          }
        });

        // If no record was found, insert a new one
        if (results.length === 0) {
          const queryInsertGuesses = `INSERT INTO PlayerGuesses (PlayerID, GameID, NumberOfGuesses) VALUES (?, ?, ?)`;
          connection.query(queryInsertGuesses, [playerID, gameID, newGuesses], (err) => {
            if (err) {
              console.error('Error inserting new guess count:', err);
            }
          });
        }
      });
    }
  });
}

// Function to start the guessing game
function guessTheNumberGame() {
  console.log(messages.guessingGameWelcome);

  const pcNumber = Math.floor(Math.random() * 100 + 1); // Generate the random number once

  const playGame = () => {
    input.question("Your guess: ", (userguess) => {
      let userGuess = parseInt(userguess); // Convert input to integer

      if (isNaN(userGuess)) {
        console.log("Invalid input, please enter a number!");
        playGame(); // Prompt for a new guess
      } else if (userGuess === pcNumber) {
        const playerID = playerIDGames; // Use global playerIDGames
        const Score = 3; 
        const addNewGameData = `INSERT INTO Games (PlayerID, Score) VALUES (?, ?)`;

        connection.query(addNewGameData, [playerID, Score], (err, results) => {
          if (err) {
            console.error('Error updating score:', err);
          } else {
            console.log("You got it correct! You win three points!");
            mainMenu(); // Return to main menu after winning
          }
        });
      } else if (userGuess > pcNumber) {
        console.log("Your number is too high!");
        userGuesses(); // Update guess count
        playGame(); // Prompt for a new guess
      } else if (userGuess < pcNumber) {
        console.log("Your number is too low!");
        userGuesses(); // Update guess count
        playGame(); // Prompt for a new guess
      }
    });

    // Prompt user to play again
    input.question(messages.playagain, (playAgainInput) => {
      if (playAgainInput.toLowerCase() === 'yes') {
        playGame(); // Restart the game
      } else if (playAgainInput.toLowerCase() === 'no') {
        mainMenu(); // Return to main menu
      }
    });
  };

  playGame(); // Start the game
}

// Function to update account data
function updateAccount() {
  const playerID = playerIDGames;

  console.log(messages.updateAccountWelcome);

  // Prompt user for update option
  input.question("Input: ", (accountdataInput) => {
    if (accountdataInput.toLowerCase() === "n") {
      console.log(messages.nameUpdate);
      input.question("New Name: ", (newname) => {
        if (newname.length < 4) {
          console.log(errorMessages.nameTooShort);
        } else if (newname.length > 16) {
          console.log(errorMessages.nameTooLong);
        } else {
          const updateAccountData = `UPDATE Player SET PlayerName = ? WHERE PlayerID = ?`;
          connection.query(updateAccountData, [newname, playerID], (err, results) => {
            console.log("Name updated successfully!");
            mainMenu(); // Return to main menu
          });
        }
      });
    } else if (accountdataInput.toLowerCase() === "p") {
      console.log(messages.changePassword);
      input.question("Old Password: ", (oldpassword) => {
        const userOldPassword = 'SELECT Password FROM Player WHERE PlayerID = ?';
        connection.query(userOldPassword, [playerID], (err, results) => {
          input.question("New Password: ", (newpassword) => {
            if (newpassword.length < 8) {
              console.log(errorMessages.passwordTooShort);
            } else if (newpassword.length > 32) {
              console.log(errorMessages.passwordTooLong);
            } else {
              const updatePasswordData = `UPDATE Player SET Password = ? WHERE PlayerID = ?`;
              connection.query(updatePasswordData, [newpassword, playerID], (err, results) => {
                console.log("Password updated successfully!");
                mainMenu(); // Return to main menu
              });
            }
          });
        });
      });
    } else if (accountdataInput.toLowerCase() === "c") {
      console.log(messages.changeCity);
      input.question("New City: ", (newcity) => {
        if (newcity.length < 3) {
          console.log(errorMessages.cityTooShort);
        } else if (newcity.length > 32) {
          console.log(errorMessages.cityTooLong);
        } else {
          const updateCityData = `UPDATE Player SET City = ? WHERE PlayerID = ?`;
          connection.query(updateCityData, [newcity, playerID], (err, results) => {
            console.log("City updated successfully!");
            mainMenu(); // Return to main menu
          });
        }
      });
    } else {
      console.log("Invalid input for updating account.");
      updateAccount(); // Retry updating account
    }
  });
}

// Function to handle account deletion
function deleteAccount() {
  input.question(messages.deletionConfirmation, (delConfirmation) => {
    if (delConfirmation.toLowerCase() === "yes") {
      const playerID = playerIDGames;
      const deleteAccountGame = `DELETE FROM Games WHERE PlayerID = ?`;
      const deleteAccountPlayer = `DELETE FROM Player WHERE PlayerID = ?`;

      connection.query(deleteAccountGame, [playerID], (err, results) => {
        if (err) {
          console.error('Error deleting game records:', err);
        }
      });
      connection.query(deleteAccountPlayer, [playerID], (err, results) => {
        if (err) {
          console.error('Error deleting player record:', err);
        }
        console.log(messages.accountDeleted);
        entryPage(); // Return to entry page
      });
    } else if (delConfirmation.toLowerCase() === "no") {
      console.log(messages.deletionCancelled);
      mainMenu(); // Return to main menu
    } else {
      console.log("Invalid input. Please enter 'Yes' or 'No'.");
      deleteAccount(); // Retry deletion process
    }
  });
}

// Main menu function
function mainMenu() {
  console.log("\x1b[1m\x1b[36m" + messages.mainmenu + "\x1b[0m");
  console.log("\x1b[1m\x1b[36m" + messages.information + "\x1b[0m");
  console.log("\x1b[1m\x1b[36m" + messages.menunumbers + "\x1b[0m");

  // Query to display top player scores
  const queryTopScores = `
    SELECT Player.PlayerName, SUM(Games.Score) AS TotalScore
    FROM Games
    JOIN Player ON Games.PlayerID = Player.PlayerID
    GROUP BY Player.PlayerID
    ORDER BY TotalScore DESC
    LIMIT 1;
  `;
  
  connection.query(queryTopScores, (err, results) => {
    if (err) {
      console.error('Error retrieving top player scores:', err);
      return;
    }
    if (results.length > 0) {
      console.log(`Player with the highest total score is ${results[0].PlayerName} with ${results[0].TotalScore} points!`);
    } else {
      console.log("No game scores found.");
    }

    // Prompt user for main menu options
    input.question("Input: ", (menuinput) => {
      if (menuinput.toLowerCase() === "1") {
        console.log("Summary of logged in user games");
        summaryOfGames(); // Display summary of games
      } else if (menuinput.toLowerCase() === "2") {
        console.log("Start new game");
        guessTheNumberGame(); // Start the guessing game
      } else if (menuinput.toLowerCase() === "u") {
        console.log("Update Account Data");
        updateAccount(); // Update account information
      } else if (menuinput.toLowerCase() === "d") {
        console.log("Delete Account");
        deleteAccount(); // Delete user account
      } else if (menuinput.toLowerCase() === "x") {
        console.log("Quitting Program...");
        process.exit(); // Exit the program
      } else {
        console.log("Invalid input, please enter a valid option!");
        mainMenu(); // Retry main menu
      }
    });
  });
}

// Function to handle user login
function loginPage() {
  console.log("Login Page");
  input.question("Username: ", (inputusername) => {
    input.question("Password: ", (inputpassword) => {
      const query = "SELECT * FROM Player WHERE PlayerName = ? AND Password = ?";
      connection.query(query, [inputusername, inputpassword], (err, results) => {
        if (err) {
          console.error('Query error!', err.stack);
          return;
        }
        if (results.length > 0) {
          console.log("Welcome back, " + inputusername + "!");
          playerIDGames = results[0].PlayerID;  // Store the PlayerID
          mainMenu();  // Call mainMenu after successful login
        } else {
          console.log("Invalid username or password!");
          loginPage();  // Retry login
        }
      });
    });
  });
}

// Function to register a new player
function RegisterPlayer(playerusername, city, password) {
  connection.query(
    `INSERT INTO Player (PlayerName, City, Password) VALUES (?, ?, ?);`,
    [playerusername, city, password],
    (err, results, fields) => {
      if (err) {
        console.error('Error inserting data into Player:', err);
        return;
      }
      loginPage(); // Redirect to login page after registration
    }
  );
}

// Function to handle user input for registration
function receivingUserInput() {
  input.question("Enter your username: ", (playerusername) => {
    input.question("Enter your city: ", (city) => {
      input.question("Enter your password: ", (password) => {

        // Validate user input
        if (!isNaN(playerusername)) {
          console.log("Your username must only be text!");
          return;
        }
        if (!isNaN(city)) {
          console.log("Your city must only be text!");
          return;
        }
        if (password.length < 6) {
          console.log("Your password must be at least 6 characters long!");
          return;
        }

        // Query to check if the username already exists
        const usernameQuery = `SELECT PlayerName FROM Player WHERE PlayerName = ?`;
        connection.query(usernameQuery, [playerusername], (err, results) => {
          if (results.length > 0) {
            console.log("This username already exists, please use another one!");
            receivingUserInput(); // Retry registration
          } else {
            RegisterPlayer(playerusername, city, password); // Register new player
          }
        });
        
      });
    });
  });
}
