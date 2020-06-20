// caching DOM
const form = document.querySelector('.registration-form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password-reg');
const password2 = document.getElementById('password-confirmation');


form.addEventListener('submit', e => {
    e.preventDefault();
    validateData();

    hasClass('success')
});

function validateData() {
    // get input data keyed in
    const usernameData = username.value.trim();
    const emailData = email.value.trim();
    const passwordData = password.value.trim();
    const password2Data = password2.value.trim();

    // check if each input is valid
        // username
        if(usernameData === '') {
            setErrorFor(username, "Username cannot be blank");
        } else {
            setSuccessFor(username);
        }

        // email
        if(emailData === '') {
            setErrorFor(email, "Email cannot be blank");
        } else if(!isValidEmail(emailData)) {
            setErrorFor(email, "Email not valid");
        } else {
            setSuccessFor(email);
        }

        // password
        if(passwordData === '') {
            setErrorFor(password, "Password cannot be blank");
        } else {
            setSuccessFor(password);
        }

        // password confirmation
        if(password2Data === '') {
            setErrorFor(password2, "Password cannot be blank");
        } else if(password2Data !== passwordData) {
            setErrorFor(password2, "Passwords do not match");
        } else {
            setSuccessFor(password2);
        }
}

function setErrorFor(input, message) {
    const formSection  = input.parentElement;
    const small = formSection.querySelector('small');

    formSection.className = "form-section error";
    small.textContent = message;
}

function setSuccessFor(input) {
    const formSection  = input.parentElement;
    formSection.className = "form-section success";
}

function isValidEmail(email) {
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
}

// Check if all inputs are valid
function hasClass(success) {
    const formSectionArray = document.querySelectorAll('.form-section');
    let isClass = [];

    for(let i=0; i<formSectionArray.length; i++) {
        isClass[i] = formSectionArray[i].classList.contains(success);
    }

    let arrayIndex = isClass.findIndex((element => element === false));
    if(arrayIndex === -1) {
        console.log("Registration Successful");
    } else {
        console.log("Error");
    }
}