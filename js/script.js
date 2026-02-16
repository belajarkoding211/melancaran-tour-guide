// ===============================
// SESSION LOGIN
// ===============================
function setSession(role) {
  localStorage.setItem("sessionRole", role);
}

function getSession() {
  return localStorage.getItem("sessionRole");
}

function logout() {
  localStorage.removeItem("sessionRole");
  alert("Logout berhasil!");
  window.location.href = "index.html";
}

// ===============================
// CHECK ROLE (Admin / User)
// ===============================
function checkRole(role) {
  let currentRole = getSession();

  if (currentRole !== role) {
    alert("Akses ditolak! Silakan login terlebih dahulu.");
    window.location.href = "index.html";
  }
}

// ===============================
// NAVBAR DINAMIS
// ===============================
function loadNavbar() {
  let role = getSession();
  let nav = document.getElementById("navArea");

  if (!nav) return;

  if (role === "admin") {
    nav.innerHTML = `
      <a href="admin-dashboard.html">DASHBOARD</a>
      <a href="admin-manage.html">KELOLA DATA</a>
      <a href="destinations.html">LOKASI</a>
      <a href="guides.html">GUIDE</a>
      <a href="contact.html">KONTAK</a>
      <a href="#" onclick="logout()">LOGOUT</a>
    `;
  } else if (role === "user") {
    nav.innerHTML = `
      <a href="user-dashboard.html">DASHBOARD</a>
      <a href="destinations.html">LOKASI</a>
      <a href="guides.html">GUIDE</a>
      <a href="contact.html">KONTAK</a>
      <a href="#" onclick="logout()">LOGOUT</a>
    `;
  } else {
    nav.innerHTML = `
      <a href="index.html">BERANDA</a>
      <a href="destinations.html">LOKASI</a>
      <a href="guides.html">GUIDE</a>
      <a href="contact.html">KONTAK</a>

      <div class="dropdown">
        <a href="#">LOGIN</a>
        <div class="dropdown-content">
          <a href="login-user.html">Login User</a>
          <a href="login-admin.html">Login Admin</a>
        </div>
      </div>
    `;
  }
}

document.addEventListener("DOMContentLoaded", loadNavbar);

// ===============================
// REGISTER USER
// ===============================
function registerUser() {
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let phone = document.getElementById("phone").value.trim();
  let password = document.getElementById("password").value.trim();

  if (name === "" || email === "" || phone === "" || password === "") {
    alert("Semua field harus diisi!");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  // cek email sudah dipakai atau belum
  let existingUser = users.find(u => u.email === email);

  if (existingUser) {
    alert("Email sudah terdaftar! Silakan login.");
    return;
  }

  users.push({
    name,
    email,
    phone,
    password
  });

  localStorage.setItem("users", JSON.stringify(users));

  alert("Registrasi berhasil! Silakan login.");
  window.location.href = "login-user.html";
}

// ===============================
// LOGIN USER
// ===============================
function loginUser() {
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    alert("Email atau Password salah!");
    return;
  }

  setSession("user");
  localStorage.setItem("currentUser", JSON.stringify(user));

  alert("Login User berhasil!");
  window.location.href = "user-dashboard.html";
}

// ===============================
// LOGIN ADMIN (DEFAULT)
// ===============================
function loginAdmin() {
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();

  if (email === "admin@baliguide.com" && password === "admin123") {
    setSession("admin");
    alert("Login Admin berhasil!");
    window.location.href = "admin-dashboard.html";
  } else {
    alert("Email atau Password Admin salah!");
  }
}

// ===============================
// DATA DEFAULT DESTINASI
// ===============================
function getDefaultDestinations() {
  return [
    { name: "Pura Tanah Lot", image: "tanahlot.jpg" },
    { name: "Ubud Monkey Forest", image: "monkey.jpg" },
    { name: "Pantai Kuta", image: "panku.jpg" },
    { name: "Nusa Penida", image: "nuspen.jpg" },
    { name: "Pura Uluwatu", image: "purauluwatu.jpg" }
  ];
}

// ===============================
// LOAD DESTINATIONS
// ===============================
function loadDestinations() {
  let list = document.getElementById("destinationList");
  if (!list) return;

  let destinations = JSON.parse(localStorage.getItem("destinations"));

  if (!destinations || destinations.length === 0) {
    destinations = getDefaultDestinations();
    localStorage.setItem("destinations", JSON.stringify(destinations));
  }

  list.innerHTML = "";

  destinations.forEach(dest => {
    list.innerHTML += `
      <div class="card">
        <img src="${dest.image}" alt="${dest.name}">
        <h3>${dest.name}</h3>
      </div>
    `;
  });
}

// ===============================
// DEFAULT GUIDES
// ===============================
function getDefaultGuides() {
  return [
    {
      name: "I Made Arya",
      location: "Ubud",
      specialization: "Budaya Bali & Pura",
      language: "Indonesia, English",
      experience: "7 tahun",
      whatsapp: "6281234567890"
    },
    {
      name: "Ni Luh Sari Dewi",
      location: "Kuta / Seminyak",
      specialization: "City Tour & Sunset",
      language: "Indonesia, English",
      experience: "5 tahun",
      whatsapp: "6289876543210"
    },
    {
      name: "Kadek Putra",
      location: "Nusa Penida",
      specialization: "Snorkeling & Island Tour",
      language: "Indonesia, English",
      experience: "6 tahun",
      whatsapp: "6281112223334"
    }
  ];
}

// ===============================
// LOAD GUIDES
// ===============================
function loadGuides() {
  let list = document.getElementById("guideList");
  if (!list) return;

  let guides = JSON.parse(localStorage.getItem("guides"));

  if (!guides || guides.length === 0) {
    guides = getDefaultGuides();
    localStorage.setItem("guides", JSON.stringify(guides));
  }

  list.innerHTML = "";

  guides.forEach(g => {
    list.innerHTML += `
      <div class="guide-card">
        <h3>${g.name}</h3>
        <p><b>Lokasi:</b> ${g.location}</p>
        <p><b>Spesialisasi:</b> ${g.specialization}</p>
        <p><b>Bahasa:</b> ${g.language}</p>
        <p><b>Pengalaman:</b> ${g.experience}</p>
        <a class="btn-wa" target="_blank"
          href="https://wa.me/${g.whatsapp}?text=Halo%20${encodeURIComponent(g.name)},%20saya%20ingin%20booking%20tour%20di%20${encodeURIComponent(g.location)}.">
          Chat WhatsApp
        </a>
      </div>
    `;
  });
}

// ===============================
// ADMIN ADD DESTINATION
// ===============================
function addDestination() {
  let name = document.getElementById("destName").value.trim();
  let image = document.getElementById("destImage").value.trim();

  if (name === "" || image === "") {
    alert("Nama destinasi dan link gambar harus diisi!");
    return;
  }

  let destinations = JSON.parse(localStorage.getItem("destinations")) || [];
  destinations.push({ name, image });

  localStorage.setItem("destinations", JSON.stringify(destinations));

  alert("Destinasi berhasil ditambahkan!");
  adminLoadDestinations();
}

// ===============================
// ADMIN LOAD DESTINATION
// ===============================
function adminLoadDestinations() {
  let list = document.getElementById("adminDestinationList");
  if (!list) return;

  let destinations = JSON.parse(localStorage.getItem("destinations")) || [];
  list.innerHTML = "";

  destinations.forEach((dest, index) => {
    list.innerHTML += `
      <div class="card">
        <img src="${dest.image}" alt="${dest.name}">
        <h3>${dest.name}</h3>
        <button class="btn-delete" onclick="deleteDestination(${index})">Hapus</button>
      </div>
    `;
  });
}

function deleteDestination(index) {
  let destinations = JSON.parse(localStorage.getItem("destinations")) || [];
  destinations.splice(index, 1);

  localStorage.setItem("destinations", JSON.stringify(destinations));
  adminLoadDestinations();
}

// ===============================
// ADMIN ADD GUIDE
// ===============================
function addGuide() {
  let name = document.getElementById("guideName").value.trim();
  let location = document.getElementById("guideLocation").value.trim();
  let specialization = document.getElementById("guideSpecialization").value.trim();
  let language = document.getElementById("guideLanguage").value.trim();
  let experience = document.getElementById("guideExperience").value.trim();
  let whatsapp = document.getElementById("guideWhatsapp").value.trim();

  if (name === "" || location === "" || specialization === "" || language === "" || experience === "" || whatsapp === "") {
    alert("Semua data guide harus diisi!");
    return;
  }

  let guides = JSON.parse(localStorage.getItem("guides")) || [];
  guides.push({ name, location, specialization, language, experience, whatsapp });

  localStorage.setItem("guides", JSON.stringify(guides));

  alert("Guide berhasil ditambahkan!");
  adminLoadGuides();
}

// ===============================
// ADMIN LOAD GUIDES
// ===============================
function adminLoadGuides() {
  let list = document.getElementById("adminGuideList");
  if (!list) return;

  let guides = JSON.parse(localStorage.getItem("guides")) || [];
  list.innerHTML = "";

  guides.forEach((g, index) => {
    list.innerHTML += `
      <div class="guide-card">
        <h3>${g.name}</h3>
        <p><b>Lokasi:</b> ${g.location}</p>
        <p><b>Spesialisasi:</b> ${g.specialization}</p>
        <p><b>Bahasa:</b> ${g.language}</p>
        <p><b>Pengalaman:</b> ${g.experience}</p>
        <p><b>WhatsApp:</b> ${g.whatsapp}</p>
        <button class="btn-delete" onclick="deleteGuide(${index})">Hapus</button>
      </div>
    `;
  });
}

function deleteGuide(index) {
  let guides = JSON.parse(localStorage.getItem("guides")) || [];
  guides.splice(index, 1);

  localStorage.setItem("guides", JSON.stringify(guides));
  adminLoadGuides();
}
