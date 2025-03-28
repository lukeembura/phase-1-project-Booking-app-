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

function goToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: "smooth" });
    }
}

function saveHomePageData() {
    const fullName = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    localStorage.setItem("fullName", fullName);
    localStorage.setItem("email", email);
    localStorage.setItem("phone", phone);

    goToSection("booking-info");
}

function saveBookingInfoData() {
    const departureStation = document.getElementById("from").value;
    const arrivalStation = document.getElementById("to").value;
    const numberOfPassengers = document.getElementById("zip").value;

    
    if (numberOfPassengers > 20) {
        alert("The maximum number of passengers allowed is 20. Please enter a valid number.");
        return; 
    }

    localStorage.setItem("departureStation", departureStation);
    localStorage.setItem("arrivalStation", arrivalStation);
    localStorage.setItem("numberOfPassengers", numberOfPassengers);

    goToSection("payment");
}

function confirmBooking() {
    const fullName = localStorage.getItem("fullName");
    const email = localStorage.getItem("email");
    const phone = localStorage.getItem("phone");
    const departureStation = localStorage.getItem("departureStation");
    const arrivalStation = localStorage.getItem("arrivalStation");
    const numberOfPassengers = localStorage.getItem("numberOfPassengers");

    document.getElementById("confirm-name").textContent = fullName || "N/A";
    document.getElementById("confirm-email").textContent = email || "N/A";
    document.getElementById("confirm-phone").textContent = phone || "N/A";
    document.getElementById("confirm-departure").textContent = departureStation || "N/A";
    document.getElementById("confirm-arrival").textContent = arrivalStation || "N/A";
    document.getElementById("confirm-passengers").textContent = numberOfPassengers || "N/A";

    goToSection("booking-confirmation");
}

async function fetchTrainData() {
    try {
        const response = await fetch('./db.json'); 
        const trains = await response.json();

        populateStationDropdowns(trains);
    } catch (error) {
        console.error("Error fetching train data:", error);
    }
}

function populateStationDropdowns(trains) {
    const departureDropdown = document.getElementById("from");
    const arrivalDropdown = document.getElementById("to");

    const departureStations = [...new Set(trains.map(train => train.departure_station))];
    const arrivalStations = [...new Set(trains.map(train => train.arrival_station))];

    departureStations.forEach(station => {
        const option = document.createElement("option");
        option.value = station;
        option.textContent = station;
        departureDropdown.appendChild(option);
    });

    arrivalStations.forEach(station => {
        const option = document.createElement("option");
        option.value = station;
        option.textContent = station;
        arrivalDropdown.appendChild(option);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const toggleThemeButton = document.getElementById("toggle-theme");

    toggleThemeButton.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        const navbar = document.querySelector(".navbar");
        navbar.classList.toggle("dark-mode");
    });
});

document.addEventListener("DOMContentLoaded", fetchTrainData);
document.addEventListener("DOMContentLoaded", displayConfirmationData);