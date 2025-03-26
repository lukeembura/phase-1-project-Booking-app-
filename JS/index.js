function togglePaymentFields() {
    const paymentMethod = document.getElementById("payment-method").value;
    const creditCardFields = document.getElementById("credit-card-fields");
    const bankTransferFields = document.getElementById("bank-transfer-fields");

    if (paymentMethod === "credit-card") {
        creditCardFields.style.display = "block";
        bankTransferFields.style.display = "none";
    } else if (paymentMethod === "bank-transfer") {
        creditCardFields.style.display = "none";
        bankTransferFields.style.display = "block";
    }
}

function goToNextPage() {
    window.location.href = "booking-info"; 
}

// Display timetable data
async function fetchTimetable(lat, lon) {
    const url = `https://search.ch/timetable/api/completion.json?latlon=${lat},${lon}&accuracy=10`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const timetableDiv = document.getElementById("timetable-data");
        timetableDiv.innerHTML = JSON.stringify(data, null, 2); // Display raw data for now
    } catch (error) {
        console.error("Error fetching timetable data:", error);
    }
}

// Display station data
async function fetchStationData(stop) {
    const url = `https://search.ch/timetable/api/station.json?stop=${stop}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const stationDiv = document.getElementById("station-data");
        stationDiv.innerHTML = JSON.stringify(data, null, 2); // Display raw data for now
    } catch (error) {
        console.error("Error fetching station data:", error);
    }
}

// Display station board data
async function fetchStationBoard(stop) {
    const url = `https://search.ch/timetable/api/stationboard.json?stop=${stop}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const stationBoardDiv = document.getElementById("station-board-data");
        stationBoardDiv.innerHTML = JSON.stringify(data, null, 2); // Display raw data for now
    } catch (error) {
        console.error("Error fetching station board data:", error);
    }
}

// Example usage
fetchTimetable(46.948004, 7.448134); // Fetch timetable data for a specific location
fetchStationData("Einsiedeln"); // Fetch station data for Einsiedeln
fetchStationBoard("Einsiedeln"); // Fetch station board data for Einsiedeln