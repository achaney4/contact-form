const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  result.innerHTML = "Please wait..."

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = json.message;
            } else {
                console.log(response);
                result.innerHTML = json.message;
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
        })
        .then(function() {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 3000);
        });
});


function validateForm() {

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("inputEmail4").value;
    const phone = document.getElementById("phoneNum").value;
    const message = document.getElementById("message").value;

    const firstNameError = document.getElementById("firstName-error");
    const lastNameError = document.getElementById("lastName-error");
    const emailError = document.getElementById("email-error");
    const phoneError = document.getElementById("phone-error");
    const messageError = document.getElementById("message-error");
    
    firstNameError.textContent = "";
    lastNameError.textContent = "";
    emailError.textContent = "";
    phoneError.textContent = "";
    messageError.textContent = "";
    
    let isValid = true;

    
    if (firstName === "" || /\d/.test(firstName)) {
        firstNameError.textContent =
            "Please enter your first name properly.";
        isValid = false;
    }

    if (lastName === "" || /\d/.test(lastName)) {
        lastNameError.textContent =
            "Please enter your last name properly.";
        isValid = false;
    }

    if (email === "" || !email.includes("@")) {
        emailError.textContent =
            "Please enter a valid email address.";
        isValid = false;
    }

    if (phone === "" || phone.length < 10 || isNaN(phone)) {
        phoneError.textContent =
            "Please enter your phone number properly.";
        isValid = false;
    }

    if (message === "" || message.length < 5) {
        messageError.textContent =
            "Please enter your message properly. Must be more than 5 characters.";
        isValid = false;
    }




    return isValid;
}