// caching DOM
const form = document.querySelector('.login-form');
const username = document.getElementById('username');
const password = document.getElementById('password');

form.addEventListener('submit', e => {
    e.preventDefault();
    validateData();

    hasClass('success')
});

function validateData() {
    // get input data keyed in
    const usernameData = username.value.trim();
    const passwordData = password.value.trim();

    // check if each input is valid
        // username
        if(usernameData === '') {
            setErrorFor(username, "Username cannot be blank");
        } else {
            setSuccessFor(username);
        }

        // password
        if(passwordData === '') {
            setErrorFor(password, "Password cannot be blank");
        } else {
            setSuccessFor(password);
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