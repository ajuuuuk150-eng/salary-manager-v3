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

const content=document.getElementById("content");

if(menu==="home"){

content.innerHTML=`

<div class="card">

<h2>🏠 Dashboard</h2>

<p>Selamat datang di Salary Tracker Pro</p>

</div>

<div class="card">

<h3>Ringkasan</h3>

<p>💰 Total Gaji :
<b id="homeGaji">${rupiah(totalData(db.gaji))}</b></p>

<p>🕒 Total Lembur :
<b id="homeLembur">${rupiah(totalData(db.lembur))}</b></p>

<p>💸 Total Pengeluaran :
<b id="homeKeluar">${rupiah(totalData(db.pengeluaran))}</b></p>

</div>

`;

}

else if(menu==="gaji"){

content.innerHTML=`

<div class="card">

<h2>💰 Input Gaji</h2>

<input
type="date"
id="gajiTanggal">

<input
type="number"
id="gajiNominal"
placeholder="Nominal Gaji">

<input
type="text"
id="gajiKet"
placeholder="Keterangan">

<button onclick="simpanGaji()">

Simpan Gaji

</button>

<div id="listGaji"></div>

</div>

`;

tampilGaji();

}

else if(menu==="lembur"){

content.innerHTML=`

<div class="card">

<h2>🕒 Input Lembur</h2>

<p>Menu lembur akan kita buat pada tahap berikutnya.</p>

</div>

`;

}

else if(menu==="keluar"){

content.innerHTML=`

<div class="card">

<h2>💸 Pengeluaran</h2>

<p>Menu pengeluaran akan kita buat pada tahap berikutnya.</p>

</div>

`;

}

else if(menu==="laporan"){

content.innerHTML=`

<div class="card">

<h2>📊 Laporan</h2>

<p>Fitur laporan akan dibuat nanti.</p>

</div>

`;

}

else{

content.innerHTML=`

<div class="card">

<h2>⚙️ Pengaturan</h2>

<p>Fitur setting akan dibuat nanti.</p>

</div>

`;

}

}

// Jalankan pertama kali
refreshDashboard();
showPage("home");

function simpanGaji(){

const tanggal=document.getElementById("gajiTanggal").value;
const nominal=Number(document.getElementById("gajiNominal").value);
const ket=document.getElementById("gajiKet").value;

if(!tanggal || nominal<=0){
alert("Lengkapi data gaji");
return;
}

db.gaji.push({
id:Date.now(),
tanggal,
nominal,
ket
});

simpanDB();
refreshDashboard();
tampilGaji();

document.getElementById("gajiTanggal").value="";
document.getElementById("gajiNominal").value="";
document.getElementById("gajiKet").value="";
}

function tampilGaji(){

const list=document.getElementById("listGaji");

if(!list) return;

list.innerHTML="";

db.gaji.forEach(item=>{

list.innerHTML+=`

<div class="transaksi">

<b>💰 Gaji</b><br>

📅 ${item.tanggal}<br>

${rupiah(item.nominal)}<br>

${item.ket}

<div class="aksi">

<button onclick="hapusGaji(${item.id})">

🗑 Hapus

</button>

</div>

</div>

`;

});

}

function hapusGaji(id){

if(!confirm("Hapus transaksi ini?")) return;

db.gaji=db.gaji.filter(item=>item.id!==id);

simpanDB();

refreshDashboard();

tampilGaji();

}
