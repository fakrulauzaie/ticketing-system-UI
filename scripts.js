const generalPhoneRegex = /^\+?\d{7,15}$/;

const countryRules = {
  Malaysia: /^(\+60|0|)[1-9][0-9]{7,9}$/,
  Singapore: /^(\+65|65|0)?[6|8|9]\d{7}$/
};

// Real-time cleaning and block invalid keypresses for phone number input
$('#phoneNumber').on('input', function () {
  $(this).val($(this).val().replace(/[^0-9]/g, ''));
}).on('keypress', function (e) {
  if (!/^\d$/.test(e.key)) {
    e.preventDefault();
  }
});

// Validate and go to Screen 3
function validateAndGoToScreen3() {
  const $phoneNumber = $('#phoneNumber');
  const $countryCode = $('#countryCode');
  const $errorMessagePrimary = $('#errorMessagePrimary');
  const $errorMessageSecondary = $('#errorMessageSecondary');

  const phoneNumber = $phoneNumber.val().trim();
  const countryCode = $countryCode.val();
  const cleanedNumber = cleanPhoneNumber(phoneNumber);

  const validationError = validatePhoneNumber(cleanedNumber, countryCode);

  if (validationError) {
    const [malayError, englishError] = validationError;
    showError($errorMessagePrimary, $errorMessageSecondary, malayError, englishError);
  } else {
    hideError($errorMessagePrimary, $errorMessageSecondary);
    window.location.href = 'screen3.html';
  }
}

// Extra function to make sure the input number is clean
function cleanPhoneNumber(number) {
  return number.replace(/[^+\d]/g, '');
}

// Validation function for mobile numbers
function validatePhoneNumber(number, countryCode) {
  if (!number.match(generalPhoneRegex)) {
    return [
      "Sila masukkan nombor telefon yang sah (7-15 digit).",
      "Please enter a valid mobile number (7-15 digits)."
    ];
  }

  if (countryRules[countryCode] && !number.match(countryRules[countryCode])) {
    return [
      `Format nombor tidak sah untuk ${countryCode}.`,
      `Invalid number format for ${countryCode}.`
    ];
  }

  return null;
}

// Show error message
function showError($primary, $secondary, englishError, malayError) {
  $primary.text(englishError).removeClass('hidden');
  $secondary.text(malayError).removeClass('hidden');
}

// Hide error message
function hideError($primary, $secondary) {
  $primary.addClass('hidden');
  $secondary.addClass('hidden');
}
