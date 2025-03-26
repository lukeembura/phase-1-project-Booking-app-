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

function displayConfirmationData() {
    const fullName = localStorage.getItem("fullName");
    const email = localStorage.getItem("email");
    const phone = localStorage.getItem("phone");

    document.getElementById("confirm-name").textContent = fullName || "N/A";
    document.getElementById("confirm-email").textContent = email || "N/A";
    document.getElementById("confirm-phone").textContent = phone || "N/A";
}

document.addEventListener("DOMContentLoaded", displayConfirmationData);