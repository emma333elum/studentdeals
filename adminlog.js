import { createClient } from
'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = "YOUR_SUPABASE_PROJECT_URL";
const SUPABASE_KEY = "YOUR_SUPABASE_PUBLISHABLE_KEY";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const form = document.getElementById("loginForm");
const message = document.getElementById("loginMessage");
const loginBtn = document.getElementById("loginBtn");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  loginBtn.disabled = true;
  loginBtn.textContent = "Signing in...";
  message.textContent = "";

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    message.textContent = error.message;
    message.className = "login-error";
    loginBtn.disabled = false;
    loginBtn.textContent = "Sign in to dashboard";
    return;
  }

  window.location.href = "admin.html";
});
