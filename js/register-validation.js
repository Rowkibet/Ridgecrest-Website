//caching DOM
const registerForm = document.querySelector("#registration-form");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const passwordReg = document.querySelector("#password-reg");
const passwordConf = document.querySelector("#password-confirmation");
const submitLogin = document.querySelector("#login-btn");
const submitRegDiv = document.querySelector("#submit-reg");
const submitRegister = document.querySelector("#register-btn");
let buffer = [];
let compareBuffer = [];

const div = document.createElement("div");

// Registration form
// Compare between the two passwords at register
passwordReg.addEventListener('keydown', e => {
    const charList = 'abcdefghijklmnopqrstuvwxyz0123456789' + 'Backspace';
    const key = e.key;

    // Remove last character from string
    if(key === "Backspace") {
        buffer.pop();
        console.log(buffer);
    }

    // Prevent character from appearing at input field
    if(charList.indexOf(key) === -1) {
        //Makes sure that the char not part of the list don't get printed when pressed
        //But prevents Backspace from deleting characters.
        e.preventDefault();
        return;
    }

    buffer.push(key);
    console.log(buffer);

});

passwordConf.addEventListener('keydown', e => {
    const charList = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const key = e.key;

    // Remove error/success msg
    registerForm.removeChild(div);

    // Remove last character from string
    if(key === "Backspace") {
        compareBuffer.pop();
        console.log(compareBuffer);
    }

    // Prevent character from appearing at input field
    if(charList.indexOf(key) === -1) {
        e.preventDefault();
        return;
    }

    compareBuffer.push(key);
    console.log(compareBuffer)
});

passwordConf.addEventListener('focusout', () => {
    let firstPwd = [], secondPwd = [];

    buffer.forEach(character => {
        firstPwd += character;
    });

    compareBuffer.forEach(character => {
        secondPwd += character;
    });

    // If passwords don't match
    if(firstPwd !== secondPwd) {
        const div = document.createElement("div");
        const text = document.createTextNode("Passwords Don't Match");
        div.appendChild(text);
        registerForm.insertBefore(div, submitRegDiv);

        div.classList.add("msg", "error");
    // if passwords match
    } else {
        const text = document.createTextNode("Passwords Both Match");
        div.appendChild(text);
        registerForm.insertBefore(div, submitRegDiv);

        div.classList.add("msg", "success");
    }

})

// When submit is cllcked verify if every input field is filled and is valid
submitRegister.addEventListener('submit', e => {
    if(buffer !== compareBuffer) {
        const div = document.createElement("div");
        const node = document.createTextNode("Password Not Match");
        div.appendChild(node);
        passwordConf.appendChild(div);

        div.classList.add("msg", "error");
    }

    //Prevents the page from reloading when submit btn is clicked.
    e.preventDefault();
});






// Listen in at every input field and check if data valid
// Store temporarily the user data
// Change to user at nav bar when log in successful
// Change back to initial page when user logs out