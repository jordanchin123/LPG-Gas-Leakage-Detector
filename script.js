document.addEventListener("DOMContentLoaded", function() {
    // Simulating data fetching
    const gasValue = 950;
    const tempValue = 26.5;
    const humidityValue = 55;

    // Simulating the current date
    const currentDate = new Date().toLocaleDateString();

    // Update gas gauge value and date
    document.getElementById('gasValue').innerText = gasValue;
    document.getElementById('gasDate').innerText = currentDate;

    // Update temperature gauge value and date
    document.getElementById('tempValue').innerText = tempValue;
    document.getElementById('tempDate').innerText = currentDate;

    // Update humidity gauge value and date
    document.getElementById('humidityValue').innerText = humidityValue;
    document.getElementById('humidityDate').innerText = currentDate;

    // Optional: Initialize your gauges using Chart.js here
});
