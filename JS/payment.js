const paymentMethodSelect = document.getElementById('payment-method');
const creditCardFields = document.getElementById('credit-card-fields');
const bankTransferFields = document.getElementById('bank-transfer-fields');

paymentMethodSelect.addEventListener('change', () => {
  if (paymentMethodSelect.value === 'credit-card') {
    creditCardFields.style.display = 'block';
    bankTransferFields.style.display = 'none';
  } else if (paymentMethodSelect.value === 'bank-transfer') {
    creditCardFields.style.display = 'none';
    bankTransferFields.style.display = 'block';
  }
});

function handlePaymentSubmission(event) {
  event.preventDefault(); // Prevent default form submission
  alert('Payment details submitted successfully!');
  window.location.href = 'confirmation.html'; // Redirect to confirmation page
}