// ==========================
// Salary Tracker Pro V4
// Script Dasar
// ==========================

// Database
let db = JSON.parse(localStorage.getItem("salaryTracker")) || {
  gaji: [],
  lembur: [],
  pengeluaran: [],
  target: 0
};

// Simpan ke Local Storage
function simpanDB() {
  localStorage.setItem("salaryTracker", JSON.stringify(db));
}

// Format Rupiah
function rupiah(angka) {
  return "Rp " + Number(angka).toLocaleString("id-ID");
}

// Hitung total
function totalData(arr) {
  return arr.reduce((t, i) => t + Number(i.nominal), 0);
}

// Refresh Dashboard
function refreshDashboard() {
  const totalGaji = totalData(db.gaji);
  const totalLembur = totalData(db.lembur);
  const totalKeluar = totalData(db.pengeluaran);

  document.getElementById("totalGaji").textContent = rupiah(totalGaji);
  document.getElementById("totalLembur").textContent = rupiah(totalLembur);
  document.getElementById("totalKeluar").textContent = rupiah(totalKeluar);
  document.getElementById("saldo").textContent = rupiah(totalGaji + totalLembur - totalKeluar);
  document.getElementById("target").textContent = rupiah(db.target);
}

// Tanggal hari ini
const today = new Date();

document.getElementById("today").textContent =
today.toLocaleDateString("id-ID",{
weekday:"long",
day:"numeric",
month:"long",
year:"numeric"
});

// Menu
function showPage(menu){
  document.getElementById("content").innerHTML =
  "<div class='card'><h2>"+menu.toUpperCase()+"</h2><p>Halaman sedang dibuat...</p></div>";
}

// Jalankan pertama kali
refreshDashboard();
showPage("home");
