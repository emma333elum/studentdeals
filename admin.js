
import { createClient } from
'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = "YOUR_SUPABASE_PROJECT_URL";
const SUPABASE_KEY = "YOUR_SUPABASE_PUBLISHABLE_KEY";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const submissionList = document.getElementById("submissionList");
const statusFilter = document.getElementById("statusFilter");

let submissions = [];

async function checkAdmin() {
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    alert("Please log in first.");
    window.location.href = "login.html";
    return false;
  }

  const { data, error: adminError } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (adminError || !data) {
    alert("Access denied. Admin account required.");
    window.location.href = "index.html";
    return false;
  }

  return true;
}

async function loadSubmissions() {
  submissionList.innerHTML =
    '<p class="empty-message">Loading offers...</p>';

  const { data, error } = await supabase
    .from("submissions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    submissionList.textContent =
      "Could not load offers: " + error.message;
    return;
  }

  submissions = data || [];
  updateStats();
  displaySubmissions();
}

function updateStats() {
  document.getElementById("totalCount").textContent =
    submissions.length;

  document.getElementById("pendingCount").textContent =
    submissions.filter(s => s.status === "Pending").length;

  document.getElementById("approvedCount").textContent =
    submissions.filter(s => s.status === "Approved").length;

  document.getElementById("rejectedCount").textContent =
    submissions.filter(s => s.status === "Rejected").length;
}

function displaySubmissions() {
  const filter = statusFilter.value;

  const filtered = submissions.filter(s =>
    filter === "All" || s.status === filter
  );

  if (!filtered.length) {
    submissionList.innerHTML =
      '<p class="empty-message">No submissions found.</p>';
    return;
  }

  submissionList.replaceChildren();

  filtered.forEach(shop => {
    const card = document.createElement("article");
    card.className = "offer-card";

    const heading = document.createElement("h3");
    heading.textContent = shop.shop_name;

    const status = document.createElement("span");
    status.className = "status " + shop.status;
    status.textContent = shop.status;

    const details = [
      "Category: " + shop.category,
      "Discount: " + shop.discount,
      "Location: " + shop.location,
      "Email: " + shop.owner_email,
      "Phone: " + shop.phone,
      "Description: " + shop.description,
      "Expiry: " + shop.expiry
    ];

    card.append(heading, status);

    details.forEach(detail => {
      const p = document.createElement("p");
      p.textContent = detail;
      card.appendChild(p);
    });

    if (shop.status === "Pending") {
      const actions = document.createElement("div");
      actions.className = "offer-actions";

      const approve = document.createElement("button");
      approve.className = "approve-btn";
      approve.textContent = "Approve";
      approve.addEventListener("click", () =>
        updateStatus(shop.id, "Approved")
      );

      const reject = document.createElement("button");
      reject.className = "reject-btn";
      reject.textContent = "Reject";
      reject.addEventListener("click", () =>
        updateStatus(shop.id, "Rejected")
      );

      actions.append(approve, reject);
      card.appendChild(actions);
    }

    submissionList.appendChild(card);
  });
}

async function updateStatus(id, newStatus) {
  const { error } = await supabase
    .from("submissions")
    .update({ status: newStatus })
    .eq("id", id);

  if (error) {
    alert("Update failed: " + error.message);
    return;
  }

  alert("Offer " + newStatus.toLowerCase() + " successfully.");
  await loadSubmissions();
}

statusFilter.addEventListener("change", displaySubmissions);

document.getElementById("logoutBtn").addEventListener("click",
  async () => {
    await supabase.auth.signOut();
    window.location.href = "login.html";
  }
);

async function startDashboard() {
  const allowed = await checkAdmin();

  if (allowed) {
    await loadSubmissions();
  }
}

startDashboard();
