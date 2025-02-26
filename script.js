const passwordInput = document.getElementById("password");
const buttons = document.querySelectorAll(".num-btn");
const clearButton = document.getElementById("clear");
const okButton = document.getElementById("ok");
const resetButton = document.getElementById("reset");
const message = document.getElementById("message");

const correctPassword = "11172024"; // Change to actual multi-digit password
let enteredPassword = "";
let attempts = 0;
const maxAttempts = 5;
const lockoutTime = 60000; // 1 minute (60,000ms)

// Handle number button clicks (Allow unlimited input)
buttons.forEach(button => {
    button.addEventListener("click", () => {
        enteredPassword += button.dataset.value;
        passwordInput.value = "*".repeat(enteredPassword.length); // Hide input
    });
});

// OK button to check password
okButton.addEventListener("click", () => {
    if (enteredPassword === "") return; // Prevent empty input from increasing attempts
    
    if (enteredPassword === correctPassword) {
        message.innerHTML = "CONGRATS!";
        message.classList.add("congrats-message"); // Add animation class

        setTimeout(() => {
            message.innerHTML = "";
            message.classList.remove("congrats-message");

            let loadingSpan = document.createElement("span");
            loadingSpan.classList.add("loading-animation");
            message.appendChild(loadingSpan);

            setTimeout(() => {
                window.location.href = "style.html";
            }, 3000);
        }, 2000);

    } else {
        attempts++;
        disableInputs(true); // Disable buttons on wrong password

        if (attempts >= maxAttempts) {
            startLockout();
        } else {
            message.innerHTML = `WRONG PASSWORD (Attempt ${attempts}/${maxAttempts})`;
            message.style.color = "red";

            setTimeout(() => {
                enteredPassword = "";
                passwordInput.value = "";
                message.innerHTML = "";
                disableInputs(false); // Re-enable buttons after message clears
            }, 2000);
        }
    }
});

// Function to start 1-minute lockout (without showing countdown)
function startLockout() {
    message.innerHTML = "Too many wrong attempts!";
    message.style.color = "orange";

    disableInputs(true);

    setTimeout(() => {
        message.innerHTML = "You can try again now!";
        message.style.color = "green";
        attempts = 0;
        disableInputs(false);
    }, lockoutTime);
}

// Function to disable/enable inputs
function disableInputs(state) {
    passwordInput.disabled = state;
    buttons.forEach(button => button.disabled = state);
    okButton.disabled = state;
    clearButton.disabled = state;
    resetButton.disabled = state;
}

// Clear button functionality
clearButton.addEventListener("click", () => {
    enteredPassword = "";
    passwordInput.value = "";
    message.innerHTML = "";
});

// Reset Password button functionality (Redirects to reset page)
resetButton.addEventListener("click", () => {
    window.location.href = "reset.html";
});
