var decimalPlaces = document.getElementById("decimal.places").value;

function decimalRounder(value, decimals) {
    var multiplier = Math.pow(10, decimals);
    var result = Math.round(value * multiplier) / multiplier;
    return result;
}