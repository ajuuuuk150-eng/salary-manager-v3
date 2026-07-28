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

<input
type="text"
id="cariGaji"
placeholder="🔍 Cari Gaji..."
onkeyup="tampilGaji()">

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

<input type="date" id="keluarTanggal">

<select id="keluarKategori">

<option value="Makan">🍜 Makan</option>

<option value="Transport">🚌 Transport</option>

<option value="BBM">⛽ BBM</option>

<option value="Belanja">🛒 Belanja</option>

<option value="Tagihan">📄 Tagihan</option>

<option value="Lainnya">📦 Lainnya</option>

</select>

<input
type="number"
id="keluarNominal"
placeholder="Nominal Pengeluaran">

<input
type="text"
id="keluarKet"
placeholder="Keterangan">

<button onclick="simpanKeluar()">

Simpan Pengeluaran

</button>

<div id="listKeluar"></div>

</div>

`;

tampilKeluar();

}

else if(menu==="laporan"){

content.innerHTML=`

<div class="card">

<h2>📊 Laporan Keuangan</h2>

<label>Bulan</label>

<input type="month" id="filterBulan">

<button onclick="buatLaporan()">

Tampilkan Laporan

</button>

<div id="hasilLaporan"></div>

<div class="card">

<h3>🥧 Grafik Pengeluaran</h3>

<canvas id="piePengeluaran" height="250"></canvas>

</div>

`;

}

else if(menu==="setting"){

content.innerHTML=`

<div class="card">

<h2>⚙️ Pengaturan</h2>

<button onclick="setTarget()">
🎯 Atur Target Tabungan
</button>

<button onclick="backupData()">
💾 Backup Data
</button>

<button onclick="resetSemua()">
🗑 Reset Semua Data
</button>

<div id="infoSetting"></div>

</div>

`;

document.getElementById("infoSetting").innerHTML=`

<p><b>Salary Tracker Pro</b></p>

<p>Versi : V5.0</p>

<p>Developer : Aziz Setiawan</p>

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

const keyword = document.getElementById("cariGaji")?.value.toLowerCase() || "";

db.gaji.forEach(item=>{

if(
    !item.ket.toLowerCase().includes(keyword) &&
    !item.tanggal.includes(keyword)
){
    return;
}

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

let editKeluarId = null;

function simpanKeluar(){

const tanggal=document.getElementById("keluarTanggal").value;
const kategori=document.getElementById("keluarKategori").value;
const nominal=Number(document.getElementById("keluarNominal").value);
const ket=document.getElementById("keluarKet").value;

if(!tanggal || nominal<=0){
alert("Lengkapi data pengeluaran");
return;
}

if(editKeluarId!==null){

const index=db.pengeluaran.findIndex(x=>x.id===editKeluarId);

db.pengeluaran[index]={
id:editKeluarId,
tanggal,
kategori,
nominal,
ket
};

editKeluarId=null;

}else{

db.pengeluaran.push({
id:Date.now(),
tanggal,
kategori,
nominal,
ket
});

}

simpanDB();
refreshDashboard();
tampilKeluar();

document.getElementById("keluarTanggal").value="";
document.getElementById("keluarNominal").value="";
document.getElementById("keluarKet").value="";

}

function tampilKeluar(){

const list=document.getElementById("listKeluar");

if(!list) return;

list.innerHTML="";

db.pengeluaran.forEach(item=>{

list.innerHTML+=`

<div class="transaksi">

<b>💸 ${item.kategori}</b><br>

📅 ${item.tanggal}<br>

${rupiah(item.nominal)}<br>

${item.ket}

<div class="aksi">

<button onclick="editKeluar(${item.id})">
✏️ Edit
</button>

<button onclick="hapusKeluar(${item.id})">
🗑 Hapus
</button>

</div>

</div>

`;

});

}

function editKeluar(id){

const data=db.pengeluaran.find(item=>item.id===id);

if(!data) return;

editKeluarId=id;

document.getElementById("keluarTanggal").value=data.tanggal;
document.getElementById("keluarKategori").value=data.kategori;
document.getElementById("keluarNominal").value=data.nominal;
document.getElementById("keluarKet").value=data.ket;

}

function hapusKeluar(id){

if(!confirm("Hapus pengeluaran ini?")) return;

db.pengeluaran=db.pengeluaran.filter(item=>item.id!==id);

simpanDB();
refreshDashboard();
tampilKeluar();

}

function buatLaporan(){

const bulan=document.getElementById("filterBulan").value;

if(!bulan){

alert("Pilih bulan");

return;

}

const semua=[

...db.gaji,

...db.lembur,

...db.pengeluaran

];

let totalGaji=0;
let totalLembur=0;
let totalKeluar=0;

db.gaji.forEach(item=>{

if(item.tanggal.startsWith(bulan)){

totalGaji+=Number(item.nominal);

}

});

db.lembur.forEach(item=>{

if(item.tanggal.startsWith(bulan)){

totalLembur+=Number(item.nominal);

}

});

db.pengeluaran.forEach(item=>{

if(item.tanggal.startsWith(bulan)){

totalKeluar+=Number(item.nominal);

}

});

const saldo=totalGaji+totalLembur-totalKeluar;

document.getElementById("hasilLaporan").innerHTML = `

<div class="card">

<h3>📅 ${bulan}</h3>

<p>💰 Gaji : ${rupiah(totalGaji)}</p>

<p>🕒 Lembur : ${rupiah(totalLembur)}</p>

<p>💸 Pengeluaran : ${rupiah(totalKeluar)}</p>

<hr>

<h2>💵 Saldo : ${rupiah(saldo)}</h2>

<div style="margin:20px 0">
<h3>🎯 Progress Target Tabungan</h3>

<div style="
background:#ddd;
height:25px;
border-radius:30px;
overflow:hidden;
">

<div style="
width:${Math.min((saldo/db.target)*100,100)}%;
height:25px;
background:linear-gradient(to right,#4CAF50,#00C853);
text-align:center;
color:white;
font-weight:bold;
line-height:25px;
">

${db.target>0?((saldo/db.target)*100).toFixed(1):0}%

</div>

</div>

<p style="margin-top:8px">

${rupiah(saldo)} dari ${rupiah(db.target)}

</p>

</div>

<canvas id="grafikLaporan" height="250"></canvas>

<br><br>

<h3>🥧 Pengeluaran per Kategori</h3>

<canvas id="piePengeluaran" height="250"></canvas>

<br><br>

<h3>📈 Tren Saldo Bulanan</h3>

<canvas id="grafikBulanan" height="250"></canvas>

</div>

`;

new Chart(document.getElementById("grafikLaporan"),{

type:"bar",

data:{

labels:["Gaji","Lembur","Pengeluaran","Saldo"],

datasets:[{

label:"Laporan Keuangan",

data:[

totalGaji,

totalLembur,

totalKeluar,

saldo

],

backgroundColor:[

"#4CAF50",

"#2196F3",

"#F44336",

"#FFC107"

]

}]

},

options:{

responsive:true,

plugins:{

legend:{

display:false

}

}

}

});

// ===============================
// PIE CHART PENGELUARAN
// ===============================

let kategori = {};

db.pengeluaran.forEach(item => {

  if (item.tanggal.startsWith(bulan)) {

    if (!kategori[item.kategori]) {
      kategori[item.kategori] = 0;
    }

    kategori[item.kategori] += Number(item.nominal);

  }

});

new Chart(document.getElementById("piePengeluaran"), {

  type: "pie",

  data: {

    labels: Object.keys(kategori),

    datasets: [{

      data: Object.values(kategori),

      backgroundColor: [
        "#4CAF50",
        "#2196F3",
        "#FFC107",
        "#F44336",
        "#9C27B0",
        "#00BCD4"
      ],

      borderWidth: 1

    }]

  },

  options: {

    responsive: true,

    plugins: {

      legend: {
        position: "bottom"
      }

    }

  }

});

let dataBulanan = {};

db.gaji.forEach(item => {

  const bulanData = item.tanggal.substring(0,7);

  if(!dataBulanan[bulanData]){
    dataBulanan[bulanData] = 0;
  }

  dataBulanan[bulanData] += Number(item.nominal);

});

db.lembur.forEach(item => {

  const bulanData = item.tanggal.substring(0,7);

  if(!dataBulanan[bulanData]){
    dataBulanan[bulanData] = 0;
  }

  dataBulanan[bulanData] += Number(item.nominal);

});

db.pengeluaran.forEach(item => {

  const bulanData = item.tanggal.substring(0,7);

  if(!dataBulanan[bulanData]){
    dataBulanan[bulanData] = 0;
  }

  dataBulanan[bulanData] -= Number(item.nominal);

});

new Chart(document.getElementById("grafikBulanan"),{

  type:"line",

  data:{

    labels:Object.keys(dataBulanan),

    datasets:[{

      label:"Saldo Bulanan",

      data:Object.values(dataBulanan),

      borderWidth:3,

      fill:false,

      tension:0.3

    }]

  },

  options:{

    responsive:true,

    plugins:{

      legend:{
        display:true
      }

    }

  }

});

}

function setTarget(){

const nilai=prompt("Masukkan target tabungan");

if(nilai===null) return;

db.target=Number(nilai);

simpanDB();

refreshDashboard();

alert("Target berhasil disimpan");

}

function backupData(){

const data=JSON.stringify(db,null,2);

const blob=new Blob([data],{type:"application/json"});

const url=URL.createObjectURL(blob);

const a=document.createElement("a");

a.href=url;

a.download="salary-backup.json";

a.click();

URL.revokeObjectURL(url);

}

function resetSemua(){

if(!confirm("Yakin ingin menghapus semua data?")) return;

db={
gaji:[],
lembur:[],
pengeluaran:[],
target:0
};

simpanDB();

refreshDashboard();

showPage("home");

alert("Semua data berhasil dihapus");

}
