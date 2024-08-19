// Decimal Rounder

function decimalRounder(value, decimals) {
    var multiplier = Math.pow(10, decimals);
    return Math.round(value * multiplier) / multiplier;
}

function bmiFunction() {
    // Getting input values
    var height = parseFloat(document.getElementById("height").value);
    var weight = parseFloat(document.getElementById("weight").value);
    var decimalPlaces = parseInt(document.getElementById("decimal-places").value, 10);
    var inp_unitsystem = document.getElementById("inp_unitsystem").value;
    var inp_weightunitsystem = document.getElementById("inp_weightunitsystem").value;

    var name = document.getElementById("name").value;

    // Warnings
    var bmiDisplay = document.getElementById("bmiDisplay");
    var errorMessage = document.getElementById("errorMessage");
    var weightWarning = document.getElementById("weight-warning");
    var heightWarning = document.getElementById("height-warning");
    var decimalWarning = document.getElementById("decimal-warning");
    var textWarning = document.getElementById("text-warning");

    // Reset warnings
    heightWarning.innerHTML = "";
    weightWarning.innerHTML = "";
    decimalWarning.innerHTML = "";
    bmiDisplay.innerHTML = "";
    errorMessage.innerHTML = "";

    function clearErrorMessages() {
        // Declaring warning text variables with their specific document ID
        var heightWarning = document.getElementById("height-warning");
        var weightWarning = document.getElementById("weight-warning");
        var decimalWarning = document.getElementById("decimal-warning");
        
        // Changes the inner HTML value of these specific variables to empty, hence removing them
        heightWarning.innerHTML = "";
        weightWarning.innerHTML = "";
        decimalWarning.innerHTML = "";
    }

    // Event listeners for when the user presses a key, it clears all the error messages
    document.getElementById("height").addEventListener("keyup", clearErrorMessages);
    document.getElementById("weight").addEventListener("keyup", clearErrorMessages);
    document.getElementById("decimal-places").addEventListener("keyup", clearErrorMessages);
    
    // Input Validation
    if (isNaN(height) || height === "") {
        heightWarning.innerHTML = "Your height can't be empty";
        return false;
    }
    if (isNaN(weight) || weight === "") {
        weightWarning.innerHTML = "Your weight can't be empty";
        return false;
    }

    // Name Validation
    if (name === "") {
        textWarning.innerHTML = "Your name can't be empty";
        return false;
    }

    if (/\d/.test(name)) {
        textWarning.innerHTML = "Please only use text and spaces, you can't input numbers in your name";
        return false;
    } else {
        textWarning.innerHTML = ""; 
    }

    // Height validation
    if (inp_unitsystem === "meters") {
        if (height >= 2.5 || height <= 0.4) {
            heightWarning.innerHTML = "Your height values are unrealistic, please make sure the values are between 0.4 meters and 2.5 meters";
            return;
        }
    } else if (inp_unitsystem === "centimeters" || inp_unitsystem === "inches") {
        if (height >= 250 || height <= 40) {
            heightWarning.innerHTML = "Your height values are unrealistic, please make sure the  values are between 41 centimeters to 249 centimeters";
            return;
        }
    }

    // Weight validation
    if (inp_weightunitsystem === "pounds") {
        if (weight >= 331 || weight <= 67) {
            weightWarning.innerHTML = "Your pounds value must be between 67 pounds to 331 pounds";
            return;
        }
    } else if (inp_weightunitsystem === "kilograms") {
        if (weight >= 150 || weight <= 30) {
            weightWarning.innerHTML = "Your kilograms value must be from 30 kilograms to 150 kilograms";
            return;
        }
    }



    // Decimal places validation
    if (isNaN(decimalPlaces) || decimalPlaces < 0 || decimalPlaces > 9) {
        decimalWarning.innerHTML = "Make sure your decimal places are between 0 to 9";
        return;
    }

    // Convert height to meters
    var heightInMeters;
    if (inp_unitsystem === "inches") {
        heightInMeters = height / 39.37;
    } else if (inp_unitsystem === "centimeters") {
        heightInMeters = height / 100;
    } else if (inp_unitsystem === "meters") {
        heightInMeters = height;
    }

    // Convert weight to kilograms
    var weightInKilograms;
    if (inp_weightunitsystem === "pounds") {
        weightInKilograms = weight / 2.20462;
    } else if (inp_weightunitsystem === "kilograms") {
        weightInKilograms = weight;
    }
    
    // Calculate BMI
    var bmiCalculation_UnRounded = (weightInKilograms / (heightInMeters ** 2));
    var bmiCalculation = decimalRounder(bmiCalculation_UnRounded, decimalPlaces);

    // Display BMI
    document.getElementById("bmiDisplay").innerHTML = `Hi ${name}, your BMI is ${bmiCalculation} kg/m<sup>2</sup>`;
    
    // Display messages based on BMI value
    if (bmiCalculation < 16.5) {
        document.getElementById("errorMessage").innerHTML = "You are severely underweight";
        document.getElementById("errorMessage").style.color = "red";
    } else if (bmiCalculation < 18.5) {
        document.getElementById("errorMessage").innerHTML = "You are underweight";
        document.getElementById("errorMessage").style.color = "orange";
    } else if (bmiCalculation >= 18.5 && bmiCalculation < 25) {
        document.getElementById("errorMessage").innerHTML = "You are in the range of healthy weight, keep it up.";
        document.getElementById("errorMessage").style.color = "green";
    } else if (bmiCalculation >= 25 && bmiCalculation < 30) {
        document.getElementById("errorMessage").innerHTML = "You are overweight";
        document.getElementById("errorMessage").style.color = "orange";
    } else if (bmiCalculation >= 30 && bmiCalculation < 35) {
        document.getElementById("errorMessage").innerHTML = "You have Class I obesity";
        document.getElementById("errorMessage").style.color = "orange";
    } else if (bmiCalculation >= 35 && bmiCalculation < 40) {
        document.getElementById("errorMessage").innerHTML = "You have Class II obesity";
        document.getElementById("errorMessage").style.color = "orange";
    } else {
        document.getElementById("errorMessage").innerHTML = "You have Class III obesity";
        document.getElementById("errorMessage").style.color = "red";
    }
}
