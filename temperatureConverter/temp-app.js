document.addEventListener('DOMContentLoaded', function() {
    // Attach event listeners to the buttons
    document.getElementById('submit-button').addEventListener('click', function() {
        conversionCtoF();
    });

    document.getElementById('submit-button-2').addEventListener('click', function() {
        conversionFtoC();
    });

    document.getElementById('submit-button-3').addEventListener('click', function() {
        conversionCtoK();
    });
});

function conversionCtoF() {
    var celsius = parseFloat(document.getElementById('celcius-num').value);

    // Validate the input
    if (isNaN(celsius) || celsius === '') {
        document.getElementById('display-conversion').innerHTML = "Please enter a valid number.";
        return;
    }

    // Convert Celsius to Fahrenheit
    var fahrenheit = (celsius * 9 / 5) + 32;
    fahrenheit = fahrenheit.toFixed(2);

    // Update the Fahrenheit input field and display the result
    document.getElementById('farenheit-num').value = fahrenheit;
    document.getElementById('display-conversion').innerHTML = `The temperature in Fahrenheit is ${fahrenheit}°F.`;
}

function conversionFtoC() {
    var fahrenheit = parseFloat(document.getElementById('farenheit-num-2').value);

    // Validate the input
    if (isNaN(fahrenheit) || fahrenheit === '') {
        document.getElementById('display-conversion').innerHTML = "Please enter a valid number.";
        return;
    }

    // Convert Fahrenheit to Celsius
    var celsius = (fahrenheit - 32) * 5 / 9;
    celsius = celsius.toFixed(2);

    // Update the Celsius input field and display the result
    document.getElementById('celcius-num-2').value = celsius;
    document.getElementById('display-conversion').innerHTML = `The temperature in Celsius is ${celsius}°C.`;
}

function conversionCtoK() {
    var celsius = parseFloat(document.getElementById('celcius-num-3').value);

    // Validate the input
    if (isNaN(celsius) || celsius === '') {
        document.getElementById('display-conversion').innerHTML = "Please enter a valid number.";
        return;
    }
    
    // Celsius to Kelvin conversion
    var kelvin = celsius + 273.15;
    kelvin = kelvin.toFixed(2);

    // Update the Kelvin input field and display the result
    document.getElementById('kelvin-num').value = kelvin;
    document.getElementById('display-conversion').innerHTML = `The temperature in Kelvin is ${kelvin}°K.`;
}
