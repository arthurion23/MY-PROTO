const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const contactForm = document.querySelector("#contactForm");
const formMessage = document.querySelector("#formMessage");
const serviceRequestForm = document.querySelector("#serviceRequestForm");
const requestMessageStatus = document.querySelector("#requestMessageStatus");
const adminLoginForm = document.querySelector("#adminLoginForm");
const adminLoginMessage = document.querySelector("#adminLoginMessage");
const serviceRequestsList = document.querySelector("#serviceRequestsList");
const contactsList = document.querySelector("#contactsList");
const requestCount = document.querySelector("#requestCount");
const contactCount = document.querySelector("#contactCount");
const logoutButton = document.querySelector("#logoutButton");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("show");
    menuToggle.classList.toggle("open");

    const menuIsOpen = navLinks.classList.contains("show");
    menuToggle.setAttribute("aria-expanded", menuIsOpen);
  });
}

if (contactForm && formMessage) {
  contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = {
      name: document.querySelector("#name").value,
      email: document.querySelector("#email").value,
      service: document.querySelector("#service").value,
      message: document.querySelector("#message").value
    };

    const result = await sendData("/api/contact", formData);
    formMessage.textContent = result.message;

    if (result.ok) {
      contactForm.reset();
    }
  });
}

if (serviceRequestForm && requestMessageStatus) {
  serviceRequestForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = {
      name: document.querySelector("#requestName").value,
      email: document.querySelector("#requestEmail").value,
      phone: document.querySelector("#requestPhone").value,
      service: document.querySelector("#requestService").value,
      budget: document.querySelector("#requestBudget").value,
      message: document.querySelector("#requestMessage").value
    };

    const result = await sendData("/api/service-requests", formData);
    requestMessageStatus.textContent = result.message;

    if (result.ok) {
      serviceRequestForm.reset();
    }
  });
}

if (adminLoginForm && adminLoginMessage) {
  adminLoginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = {
      email: document.querySelector("#adminEmail").value,
      password: document.querySelector("#adminPassword").value
    };

    const result = await sendData("/api/admin/login", formData);
    adminLoginMessage.textContent = result.message;

    if (result.ok && result.token) {
      localStorage.setItem("hexasecureAdminToken", result.token);
      window.location.href = "admin-dashboard.html";
    }
  });
}

if (serviceRequestsList && contactsList) {
  loadAdminDashboard();
}

if (logoutButton) {
  logoutButton.addEventListener("click", function () {
    localStorage.removeItem("hexasecureAdminToken");
    window.location.href = "admin.html";
  });
}

async function sendData(url, data) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    return {
      ok: response.ok,
      ...result
    };
  } catch (error) {
    return {
      ok: false,
      message: "Backend server is not running. Start it with: npm start"
    };
  }
}

async function loadAdminDashboard() {
  const token = localStorage.getItem("hexasecureAdminToken");

  if (!token) {
    window.location.href = "admin.html";
    return;
  }

  try {
    const response = await fetch("/api/admin/data", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      localStorage.removeItem("hexasecureAdminToken");
      window.location.href = "admin.html";
      return;
    }

    const data = await response.json();
    renderAdminData(data);
  } catch (error) {
    serviceRequestsList.innerHTML = '<p class="empty-state">Backend server is not running.</p>';
    contactsList.innerHTML = '<p class="empty-state">Backend server is not running.</p>';
  }
}

function renderAdminData(data) {
  const serviceRequests = data.serviceRequests || [];
  const contacts = data.contacts || [];

  requestCount.textContent = serviceRequests.length;
  contactCount.textContent = contacts.length;
  serviceRequestsList.innerHTML = serviceRequests.length ? serviceRequests.map(createRequestCard).join("") : '<p class="empty-state">No service requests yet.</p>';
  contactsList.innerHTML = contacts.length ? contacts.map(createContactCard).join("") : '<p class="empty-state">No contact messages yet.</p>';
}

function createRequestCard(request) {
  return `
    <article class="admin-item">
      <h3>${escapeHtml(request.service)}</h3>
      <p><strong>Name:</strong> ${escapeHtml(request.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(request.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(request.phone)}</p>
      <p><strong>Budget:</strong> ${escapeHtml(request.budget)}</p>
      <p>${escapeHtml(request.message)}</p>
      <span>${formatDate(request.createdAt)}</span>
    </article>
  `;
}

function createContactCard(contact) {
  return `
    <article class="admin-item">
      <h3>${escapeHtml(contact.service)}</h3>
      <p><strong>Name:</strong> ${escapeHtml(contact.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(contact.email)}</p>
      <p>${escapeHtml(contact.message)}</p>
      <span>${formatDate(contact.createdAt)}</span>
    </article>
  `;
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatDate(value) {
  if (!value) {
    return "";
  }

  return new Date(value).toLocaleString();
}
