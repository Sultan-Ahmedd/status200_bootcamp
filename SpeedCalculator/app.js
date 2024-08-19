function speedCalc() {
    // Getting distance & speed variables
    var distance = document.getElementById("distance").value; 
    var time = document.getElementById("time").value;

    // The speed formula which is distance / time and is fixed to 2 decimal places
    var speedFormula = (distance / time).toFixed(2);

    // Variable to display the speed upon submit
    var speedDisplay = document.getElementById("speed-display");

    // Changes the innerHTML of speedDisplay to text & variable calculating the speed
    speedDisplay.innerHTML = `Your speed is ${speedFormula}km/h`;

    // Output conditionals

    if (speedFormula > 100) {
        speedDisplay.innerHTML = `Too Fast! Your speed is ${speedFormula}km/hour. This is calculated by dividing the distance ${distance} by the time ${time}`
    } else if (speedFormula < 10) {
        speedDisplay.innerHTML = `Too Slow! Your speed is ${speedFormula}km/hour. This is calculated by dividing the distance ${distance} by the time ${time}`
    } else {
        speedDisplay.innerHTML = `Nice Speed! Your speed is ${speedFormula}km/hour. This is calculated by dividing the distance ${distance} by the time ${time}`
    }

    // Input Validation

    if (distance === "" || time === "") {
        speedDisplay.innerHTML = "Your values can't be empty!";
        return false;
    } else if (isNaN(distance) || isNaN(time)) {
        speedDisplay.innerHTML = "Please enter a valid number for distance and time.";
        return false;
    } else if (distance < 0) {
        speedDisplay.innerHTML = "Your distance must be equal to zero or above zero.";
        return false;
    } else if (time <= 0) {
        speedDisplay.innerHTML = "Your time must be greater than zero.";
        return false;
    }

    // Prevents website from refreshing upon submit
    return false;
}