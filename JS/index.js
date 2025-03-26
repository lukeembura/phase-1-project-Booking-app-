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

// Fetch train data from db.json
async function fetchTrainData() {
    const url = "../db.json"; // Adjust the path if necessary
    try {
        const response = await fetch(url);
        const trains = await response.json();
        populateTrainOptions(trains);
    } catch (error) {
        console.error("Error fetching train data:", error);
    }
}

// Populate train options in the booking form
function populateTrainOptions(trains) {
    const trainSelect = document.getElementById("train");
    trains.forEach(train => {
        const option = document.createElement("option");
        option.value = train.train_id;
        option.textContent = `${train.departure_station} to ${train.arrival_station} - Departure: ${train.departure_time}, Arrival: ${train.arrival_time}, Price: KES ${train.price}`;
        trainSelect.appendChild(option);
    });
}

// Handle booking submission
function handleBookingSubmission(event) {
    event.preventDefault();

    const selectedTrainId = document.getElementById("train").value;
    const fullName = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    if (!selectedTrainId) {
        alert("Please select a train.");
        return;
    }

    // Fetch train details from db.json
    fetch("../db.json")
        .then(response => response.json())
        .then(trains => {
            const selectedTrain = trains.find(train => train.train_id === selectedTrainId);
            if (selectedTrain) {
                displayBookingConfirmation(fullName, email, phone, selectedTrain);
            }
        })
        .catch(error => console.error("Error fetching train details:", error));
}

// Display booking confirmation
function displayBookingConfirmation(fullName, email, phone, train) {
    const confirmationSection = document.getElementById("booking-confirmation");
    confirmationSection.innerHTML = `
        <h1>Booking Confirmation</h1>
        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>Email Address:</strong> ${email}</p>
        <p><strong>Phone Number:</strong> ${phone}</p>
        <p><strong>Train:</strong> ${train.departure_station} to ${train.arrival_station}</p>
        <p><strong>Departure Time:</strong> ${train.departure_time}</p>
        <p><strong>Arrival Time:</strong> ${train.arrival_time}</p>
        <p><strong>Price:</strong> KES ${train.price}</p>
        <p>Your booking has been confirmed. Thank you for choosing our service!</p>
    `;
}

// Initialize the app
fetchTrainData();

