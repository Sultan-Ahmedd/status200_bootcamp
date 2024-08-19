// Height conversion

document.getElementById("inp_unitsystem").addEventListener("change", function() {
    var inp_unitsystem = document.getElementById("inp_unitsystem").value;
    var height_label = document.getElementById("height_label");

    if (inp_unitsystem === "inches") {
        height_label.innerHTML = "Enter your height (inches)";
    } else if (inp_unitsystem === "centimeters") {
        height_label.innerHTML = "Enter your height (cm - Default)";
    }
    else if (inp_unitsystem === "meters") {
        height_label.innerHTML = "Enter your height (meters)";
    }
});

// Weight conversion
document.getElementById("inp_weightunitsystem").addEventListener("change", function() {
    var inp_weightunitsystem = document.getElementById("inp_weightunitsystem").value;
    var weight_label = document.getElementById("weight_label");

    if (inp_weightunitsystem === "kilograms") {
        weight_label.innerHTML = "Enter your weight (kgs - Default)";
    } else if (inp_weightunitsystem === "pounds") {
        weight_label.innerHTML = "Enter your weight (pounds)";
    }
});