import { createClient } from
'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = "YOUR_SUPABASE_PROJECT_URL";
const SUPABASE_KEY = "YOUR_SUPABASE_PUBLISHABLE_KEY";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const form = document.getElementById("adminLoginForm");
const loginBtn = document.getElementById("loginBtn");
const btnText = document.getElementById("btnText");
const message = document.getElementById("loginMessage");

const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

// Show / hide password
togglePassword.addEventListener("click", () => {
const hidden = password.type === "password";

password.type = hidden ? "text" : "password";
togglePassword.textContent = hidden ? "Hide" : "Show";
});

// Login
form.addEventListener("submit", async (event) => {
event.preventDefault();

loginBtn.disabled = true;
btnText.textContent = "Checking account...";
message.textContent = "";

const email = document.getElementById("email").value.trim();
const passwordValue = password.value;

const { data, error } = await supabase.auth.signInWithPassword({
email,
password: passwordValue
});

if (error) {
message.textContent = error.message;
message.style.color = "#B64232";
resetButton();
return;
}

const { data: admin, error: adminError } = await supabase
.from("admin_users")
.select("user_id")
.eq("user_id", data.user.id)
.maybeSingle();

if (adminError || !admin) {
await supabase.auth.signOut();

message.textContent = "Access denied. This account is not an administrator.";
message.style.color = "#B64232";

resetButton();
return;

}

message.textContent = "Login successful. Opening dashboard...";
message.style.color = "#24613A";

window.location.href = "admin.html";
});

function resetButton() {
loginBtn.disabled = false;
btnText.textContent = "Sign in to dashboard";
  }
