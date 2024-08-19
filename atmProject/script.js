// Variables
var userNames = ["Sultan", "Ela", "John"];
var passWords = ["Sultan123", "Ela552", "JohnWolf11"];
var userbalances = [588, 10573, 15];
var currentUserIndex = 0; // Assume the user is logged in and has index 0 (Sultan)

const denominations = [10, 20, 50, 100];
var stacksize_notes = [300, 200, 150, 100];

// Functions
function amountValidation() {
    var withdrawalAmount = document.getElementById("withdraw-input").value;
    var errorElement = document.getElementById("errorPara");

    if (isNaN(withdrawalAmount) || withdrawalAmount === "") {
        errorElement.innerHTML = "Withdrawal amount is an invalid number!";
    } else if (withdrawalAmount < 0) {
        errorElement.innerHTML = "Negative numbers are inappropriate, please use a positive integer!";
    } else if (withdrawalAmount % 10 !== 0) {
        errorElement.innerHTML = "Number must be a multiple of 10.";
    } else {
        errorElement.innerHTML = withdrawalAmount + " is a valid amount.";
    }
}

function ReadNotesStackSize() {
    var output = "Available Notes: <br>";

    // Retrieve notes stack size from localStorage
    var storedNotes = JSON.parse(localStorage.getItem("AvailableNotes"));
    
    // If there are no stored notes, use the default stacksize_notes
    if (!storedNotes) {
        storedNotes = stacksize_notes;
    }

    for (let x = 0; x < storedNotes.length; x++) {
        output += "Notes: " + denominations[x] + " RMB: " + storedNotes[x] + "<br>";
    }
    
    document.getElementById("notesstack").innerHTML = output;
}


function showDenominationsOfNotes() {
    var wd_amount = document.getElementById("withdraw-input").value;
    var noteswithdrawn = [0, 0, 0, 0];
    wd_amount = parseInt(wd_amount, 10);

    var balance = parseInt(localStorage.getItem("userBalance"), 10);

    if (wd_amount > balance) {
        document.getElementById("notes_dispensed").innerHTML = "Insufficient balance to fulfill the withdrawal request.";
        return;
    }

    if (wd_amount % 10 !== 0) {
        document.getElementById("notes_dispensed").innerHTML = "The amount must be a multiple of 10.";
        return;
    }

    for (let i = stacksize_notes.length - 1; i >= 0; i--) {
        if (wd_amount <= 0) break;

        let noteValue = denominations[i];
        let availableNotes = stacksize_notes[i];
        let notesToDispense = Math.min(Math.floor(wd_amount / noteValue), availableNotes);

        if (notesToDispense > 0) {
            noteswithdrawn[i] = notesToDispense;
            wd_amount -= notesToDispense * noteValue;
            stacksize_notes[i] -= notesToDispense; // Reduce available notes
            localStorage.setItem("AvailableNotes", JSON.stringify(stacksize_notes)); // Store the entire array
        }
    }

    if (wd_amount > 0) {
        document.getElementById("notes_dispensed").innerHTML = "Insufficient notes to fulfill the withdrawal request.";
        return;
    }

    balance -= parseInt(document.getElementById("withdraw-input").value, 10);
    localStorage.setItem("userBalance", balance);

    var notes_output = "You will receive:<br>";
    for (let i = noteswithdrawn.length - 1; i >= 0; i--) {
        if (noteswithdrawn[i] > 0) {
            notes_output += noteswithdrawn[i] + " x " + denominations[i] + " notes<br>";
        }
    }

    document.getElementById("notes_dispensed").innerHTML = notes_output;
    ReadNotesStackSize(); // Update the available notes display
}

function userValidation(username, password) {
    for (let i = 0; i < userNames.length; i++) {
        if (userNames[i] === username && passWords[i] === password) {
            return i; // Return the index of the user if valid
        }
    }
    return -1; // Return -1 if invalid user
}

function handleLogin() {
    var enteredUsername = document.getElementById("username").value;
    var enteredPassword = document.getElementById("password").value;

    var userIndex = userValidation(enteredUsername, enteredPassword);

    if (userIndex !== -1) {
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("loggedInUser", enteredUsername);
        localStorage.setItem("userBalance", userbalances[userIndex]);
        window.location.href = 'atmProject_page.html';
    } else {
        document.getElementById("error-handling").innerHTML = "Login failed! Your username and password is not recognized.";
    }
}

function displayUserBalance() {
    var isLoggedIn = localStorage.getItem("isLoggedIn");
    var username = localStorage.getItem("loggedInUser");
    var balance = localStorage.getItem("userBalance");

    var balanceDisplay = document.getElementById("user-balance");

    if (isLoggedIn === "true" && username && balance !== null) {
        balanceDisplay.innerHTML = `Hi ${username}, your balance is $${balance}`;
    } else {
        balanceDisplay.innerHTML = "Please log in to see your balance.";
    }
}

function depositMoney() {
    var depositAmount = parseInt(document.getElementById("deposit-input").value, 10);
    var errorElement = document.getElementById("deposit");
    var balance = parseInt(localStorage.getItem("userBalance"), 10);

    if (isNaN(depositAmount) || depositAmount <= 0) {
        errorElement.innerHTML = "Please enter a valid positive number to deposit.";
        return;
    }

    // Update the user balance
    balance += depositAmount;
    localStorage.setItem("userBalance", balance);

    // Update the notes stack sizes
    var denominations = [10, 20, 50, 100];
    var stacksize_notes = JSON.parse(localStorage.getItem("AvailableNotes"));

    // If there are no stored notes, use the default stacksize_notes
    if (!stacksize_notes) {
        stacksize_notes = [300, 200, 150, 100];
    }

    // Calculate the number of each note denomination needed
    for (let i = denominations.length - 1; i >= 0; i--) {
        let noteValue = denominations[i];
        let notesToAdd = Math.floor(depositAmount / noteValue);

        if (notesToAdd > 0) {
            stacksize_notes[i] += notesToAdd;
            depositAmount -= notesToAdd * noteValue;

            // Update the remaining deposit amount
            if (depositAmount <= 0) break;
        }
    }

    // Store the updated notes stack sizes in localStorage
    localStorage.setItem("AvailableNotes", JSON.stringify(stacksize_notes));

    // Display the deposit success message
    errorElement.innerHTML = `You have successfully deposited $${parseInt(document.getElementById("deposit-input").value, 10)}.`;
    displayUserBalance();
}

function welcomeText() {
    var title = document.getElementById("atm-title");
    var username = localStorage.getItem("loggedInUser");
    title.textContent = `Welcome, ${username}, to ATM Simulator`;
}

// Event Listeners
window.addEventListener('load', function() {
    document.querySelector('button').addEventListener('click', handleLogin);
    document.querySelector('#display-button').addEventListener('click', displayUserBalance);
});


welcomeText(); // Call welcomeText on load