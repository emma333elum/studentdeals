
document.querySelectorAll(".toggle-password").forEach(button => {
    button.addEventListener("click", () => {
        const field = document.getElementById(button.dataset.target);

        if (field.type === "password") {
            field.type = "text";
            button.textContent = "Hide";
        } else {
            field.type = "password";
            button.textContent = "Show";
        }
    });
});

const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("fullname").value.trim();
        const password = document.getElementById("password").value;
        const confirm = document.getElementById("confirmPassword").value;
        const message = document.getElementById("message");

        message.style.color = "#d33";

        if (!name) {
            message.textContent = "Enter your full name.";
            return;
        }

        if (password.length < 8) {
            message.textContent = "Password must be at least 8 characters.";
            return;
        }

        if (password !== confirm) {
            message.textContent = "Passwords do not match.";
            return;
        }

        message.style.color = "#176b38";
        message.textContent =
            "Form validated successfully. Authentication is not connected yet.";
    });
}
