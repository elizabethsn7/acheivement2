(function() {
  var $form = document.querySelector('#register-form');
  var $emailInput = document.querySelector('#email');
  $emailInput.addEventListener('input', validateEmail);
  var $passwordInput = document.querySelector('#password');
  $passwordInput.addEventListener('input', validatePassword);

  function validateEmail() {
    var value = $emailInput.value;
    if (!value) {
      showErrorMessage($emailInput, 'Email is required.');
      return false;
    }
    if (value.indexOf('@') === -1) {
      showErrorMessage($emailInput, 'You must enter a valid email');
      return false;
    }
    showErrorMessage($emailInput, null);
    return true;
  }

  function validatePassword() {
    var value = $passwordInput.value;
    if (!value) {
      showErrorMessage($passwordInput, 'password is required');
      return false;
    }
    if(value.length < 8) {
      showErrorMessage($passwordInput, 'The password needs to be at least 8 characters.');
      return false;
    }
    showErrorMessage($passwordInput, null);
    return true;
  }
  function showErrorMessage($input, message) {
    var $container = $input.parentElement; //The .input-wrapper
    // Remove an existing error.
    var error = $container.querySelector('.error-message');
    if (error) {
      $container.removeChild(error);
    }
    //Add error if the message isnt empy.
    if(message) {
      var error = document.createElement('div');
      error.classList.add('error-message');
      error.innerText = message;
      $container.appendChild(error);
    }
  }
  function validateForm() {
    var isValidEmail = validateEmail();
    var isValidPassword = validatePassword();
    return isValidEmail && isValidPassword;
  }

  $form.addEventListener('submit', (e) => {
    e.preventDefault(); // Do not submit to the server
    if (validateForm()) {
      alert('Success!');
    }
  })
})();
