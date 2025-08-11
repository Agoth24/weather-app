function celsiusToFahrenheit(temp) {
    return (temp * (9/5)) + 32
}

function fahrenheitToCelsius(temp) {
    return (temp - 32) * (5/9)
}

export {celsiusToFahrenheit, fahrenheitToCelsius}