// ==========================
// Salary Tracker Pro V4
// Script Dasar
// ==========================

// Database
let editGajiId = null;
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

<input type="date" id="lemburTanggal">

<select id="lemburJam">

<option value="1">1 Jam</option>

<option value="1.5">1.5 Jam</option>

<option value="3.5">3.5 Jam</option>

<option value="4.5">4.5 Jam</option>

</select>

<input
type="number"
id="tarifLembur"
value="44000"
placeholder="Tarif per jam">

<button onclick="simpanLembur()">

Simpan Lembur

</button>

<div id="listLembur"></div>

</div>

`;

tampilLembur();

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

if(editGajiId !== null){

const index = db.gaji.findIndex(item => item.id === editGajiId);

db.gaji[index] = {
id: editGajiId,
tanggal,
nominal,
ket
};

editGajiId = null;

simpanDB();
refreshDashboard();
tampilGaji();

document.getElementById("gajiTanggal").value="";
document.getElementById("gajiNominal").value="";
document.getElementById("gajiKet").value="";

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

<button onclick="editGaji(${item.id})">
✏️ Edit
</button>

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

function editGaji(id){

const data = db.gaji.find(item => item.id === id);

if(!data) return;

editGajiId = id;

document.getElementById("gajiTanggal").value = data.tanggal;
document.getElementById("gajiNominal").value = data.nominal;
document.getElementById("gajiKet").value = data.ket;

}

let editLemburId = null;

function simpanLembur(){

const tanggal=document.getElementById("lemburTanggal").value;
const jam=document.getElementById("lemburJam").value;
const tarif=Number(document.getElementById("tarifLembur").value);

if(!tanggal){
alert("Pilih tanggal");
return;
}

const faktor={
"1":1.5,
"1.5":2.5,
"3.5":5.5,
"4.5":7.5
};

const nominal=faktor[jam]*tarif;

if(editLemburId!==null){

const index=db.lembur.findIndex(x=>x.id===editLemburId);

db.lembur[index]={
id:editLemburId,
tanggal,
jam,
nominal
};

editLemburId=null;

}else{

db.lembur.push({
id:Date.now(),
tanggal,
jam,
nominal
});

}

simpanDB();

refreshDashboard();

tampilLembur();

document.getElementById("lemburTanggal").value="";

}

function tampilLembur(){

const list=document.getElementById("listLembur");

if(!list) return;

list.innerHTML="";

db.lembur.forEach(item=>{

list.innerHTML+=`

<div class="transaksi">

<b>🕒 Lembur</b><br>

📅 ${item.tanggal}<br>

⏰ ${item.jam} Jam<br>

💰 ${rupiah(item.nominal)}

<div class="aksi">

<button onclick="editLembur(${item.id})">
✏️ Edit
</button>

<button onclick="hapusLembur(${item.id})">
🗑 Hapus
</button>

</div>

</div>

`;

});

}

function editLembur(id){

const data=db.lembur.find(item=>item.id===id);

if(!data) return;

editLemburId=id;

document.getElementById("lemburTanggal").value=data.tanggal;
document.getElementById("lemburJam").value=data.jam;

}

function hapusLembur(id){

if(!confirm("Hapus lembur ini?")) return;

db.lembur=db.lembur.filter(item=>item.id!==id);

simpanDB();

refreshDashboard();

tampilLembur();

}
