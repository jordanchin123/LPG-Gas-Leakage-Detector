// Function to fetch data from Google Sheets
async function fetchDataFromGoogleSheets() {
    const spreadsheetId = '1hfJ7B2CTj4jeViBN6ztUorNOofsIIsVT4YTlzhpkQcg';
    const apiKey = 'AIzaSyCz9EFh9wRX-K0qb2QJJqaXJ3wz3-TNYIQ';
    const range = 'Sheet1!A:D'; // Adjust to the range that contains your data
    
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.values) {
            const gasValue = data.values[0][0];
            const tempValue = data.values[0][1];
            const humidityValue = data.values[0][2];
            const currentDate = new Date().toLocaleDateString();
            
            document.getElementById('gasValue').innerText = gasValue;
            document.getElementById('gasDate').innerText = currentDate;
            
            document.getElementById('tempValue').innerText = tempValue;
            document.getElementById('tempDate').innerText = currentDate;
            
            document.getElementById('humidityValue').innerText = humidityValue;
            document.getElementById('humidityDate').innerText = currentDate;
        }
    } catch (error) {
        console.error("Error fetching data from Google Sheets:", error);
    }
}

// Initialize data fetch on page load
document.addEventListener("DOMContentLoaded", function() {
    fetchDataFromGoogleSheets();

    // Refresh data every 10 seconds
    setInterval(fetchDataFromGoogleSheets, 10000);
});
