const sheetId = '1hfJ7B2CTj4jeViBN6ztUorNOofsIIsVT4YTlzhpkQcg';
const apiKey = 'AIzaSyCz9EFh9wRX-K0qb2QJJqaXJ3wz3-TNYIQ';
const range = 'Sheet1!A:D'; // Adjust based on your data range

// Function to fetch data from Google Sheets
function fetchData() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayLatestData(data.values);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// Create the gauge charts using Chart.js with the Gauge plugin
const createGauge = (ctx, maxValue) => {
    return new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [0, maxValue], // Initial value and maxValue
                backgroundColor: ['#ff0000', '#ffff00', '#00ff00'], // Red to green gradient
                borderWidth: 0,
                needleValue: 0
            }]
        },
        options: {
            responsive: true,
            plugins: {
                gauge: {
                    needle: {
                        radiusPercentage: 2,
                        widthPercentage: 3.2,
                        lengthPercentage: 80,
                        color: 'rgba(0, 0, 0, 1)'
                    },
                    valueLabel: {
                        display: true,
                        formatter: Math.round,
                        fontSize: 20
                    }
                }
            },
            layout: {
                padding: {
                    bottom: 20
                }
            }
        }
    });
};

// Create the gauges for Gas, Temperature, and Humidity
const gasGauge = createGauge(document.getElementById('gasGauge').getContext('2d'), 3000);
const tempGauge = createGauge(document.getElementById('tempGauge').getContext('2d'), 100);
const humidityGauge = createGauge(document.getElementById('humidityGauge').getContext('2d'), 100);

// Function to display the latest data in gauges
function displayLatestData(data) {
    if (!data || data.length === 0) return;

    const latestRow = data[data.length - 1];
    const gasValue = parseFloat(latestRow[1]);
    const temperature = parseFloat(latestRow[2]);
    const humidity = parseFloat(latestRow[3]);

    // Update the gauge values
    gasGauge.data.datasets[0].data[0] = gasValue;
    gasGauge.update();

    tempGauge.data.datasets[0].data[0] = temperature;
    tempGauge.update();

    humidityGauge.data.datasets[0].data[0] = humidity;
    humidityGauge.update();
}

// Fetch data when the page loads
window.onload = fetchData;
