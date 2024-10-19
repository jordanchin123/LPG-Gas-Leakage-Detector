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
            document.getElementById('data-display').innerHTML = '<p>Error loading data.</p>';
        });
}

// Function to display the latest data
function displayLatestData(data) {
    if (!data || data.length === 0) {
        document.getElementById('data-display').innerHTML = '<p>No data available.</p>';
        return;
    }

    // Get the latest row of data
    const latestRow = data[data.length - 1];

    // Assuming order: Timestamp, EC Value, Temperature, Water Pump State
    const timestamp = latestRow[0];
    const gasvalue = latestRow[1];
    const temperature = latestRow[2];
    const humidity = latestRow[3];

    const html = `
        <div class="data-row">
            <span class="data-label">Timestamp: </span>
            <span class="data-value">${timestamp}</span>
        </div>
        <div class="data-row">
            <span class="data-label">Gas Value: </span>
            <span class="data-value">${gasvalue}</span>
        </div>
        <div class="data-row">
            <span class="data-label">Temperature: </span>
            <span class="data-value">${temperature}</span>
        </div>
        <div class="data-row">
            <span class="data-label">Humidity: </span>
            <span class="data-value">${humidity}</span>
        </div>
    `;

    document.getElementById('data-display').innerHTML = html;
}

// Fetch data when the page loads
window.onload = fetchData;
