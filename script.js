// ======================================
// Salary Manager Pro v3
// Bagian 1
// Database & Fungsi Dasar
// ======================================

const TARIF_LEMBUR = 44000;

const FAKTOR = {
  "1": 1.5,
  "1.5": 2.5,
  "3.5": 5.5,
  "4.5": 7.5
};

// Database Local Storage
let db = JSON.parse(localStorage.getItem("salaryManagerV3"));

if (!db) {
  db = {
    gaji: [],
    lembur: [],
    pengeluaran: []
  };
}

// Simpan Database
function simpanDB() {
  localStorage.setItem(
    "salaryManagerV3",
    JSON.stringify(db)
  );
}

// Format Rupiah
function rupiah(nominal) {
  return "Rp " + Number(nominal).toLocaleString("id-ID");
}

// Bulan aktif
let bulanAktif = "";

function setBulanSekarang() {

  const d = new Date();

  bulanAktif =
    d.getFullYear() +
    "-" +
    String(d.getMonth() + 1).padStart(2, "0");

  const filter =
    document.getElementById("filterBulan");

  if (filter) {

    filter.value = bulanAktif;

    filter.onchange = function () {

      bulanAktif = this.value;

      refreshDashboard();

    };

  }

}

// Filter berdasarkan bulan
function filterBulan(data) {

  return data.filter(function(item){

    return item.tanggal.startsWith(bulanAktif);

  });

}

// Total Gaji
function totalGaji(){

  return filterBulan(db.gaji)

  .reduce((a,b)=>a+b.nominal,0);

}

// Total Lembur
function totalLembur(){

  return filterBulan(db.lembur)

  .reduce((a,b)=>a+b.nominal,0);

}

// Total Pengeluaran
function totalKeluar(){

  return filterBulan(db.pengeluaran)

  .reduce((a,b)=>a+b.nominal,0);

}

// ======================================
// Salary Manager Pro v3
// Bagian 2
// Dashboard & Input Data
// ======================================

function refreshDashboard(){

const g=totalGaji();

const l=totalLembur();

const k=totalKeluar();

document.getElementById("gaji").innerHTML=rupiah(g);

document.getElementById("lembur").innerHTML=rupiah(l);

document.getElementById("pengeluaran").innerHTML=rupiah(k);

document.getElementById("saldo").innerHTML=rupiah(g+l-k);

document.getElementById("transaksi").innerHTML=

filterBulan(db.gaji).length+

filterBulan(db.lembur).length+

filterBulan(db.pengeluaran).length;

}

function tambahGaji(tanggal,nominal){

db.gaji.push({

tanggal,

nominal:Number(nominal)

});

simpanDB();

refreshDashboard();

}

function tambahLembur(tanggal,jam){

db.lembur.push({

tanggal,

jam,

nominal:FAKTOR[jam]*TARIF_LEMBUR

});

simpanDB();

refreshDashboard();

}

function tambahPengeluaran(tanggal,nama,nominal){

db.pengeluaran.push({

tanggal,

nama,

nominal:Number(nominal)

});

simpanDB();

refreshDashboard();

}

function hariIni(){

const d=new Date();

return d.toISOString().split("T")[0];

}

document.getElementById("today").innerHTML=

new Date().toLocaleDateString(

"id-ID",

{

weekday:"long",

day:"numeric",

month:"long",

year:"numeric"

}

);

// ======================================
// Salary Manager Pro V3
// Bagian 3
// Riwayat, Reset & Inisialisasi
// ======================================

function tampilRiwayat(){

let html="";

filterBulan(db.gaji).forEach(item=>{

html+=`
<div class="riwayat">
<b>💰 Gaji</b><br>
📅 ${item.tanggal}<br>
${rupiah(item.nominal)}
</div>
`;

});

filterBulan(db.lembur).forEach(item=>{

html+=`
<div class="riwayat">
<b>🕒 Lembur ${item.jam} Jam</b><br>
📅 ${item.tanggal}<br>
${rupiah(item.nominal)}
</div>
`;

});

filterBulan(db.pengeluaran).forEach(item=>{

html+=`
<div class="riwayat">
<b>💸 ${item.nama}</b><br>
📅 ${item.tanggal}<br>
${rupiah(item.nominal)}
</div>
`;

});

if(html==""){

html=`
<div class="card">

Belum ada transaksi bulan ini.

</div>
`;

}

const content=document.getElementById("content");

if(content){

content.innerHTML=html;

}

}

function refresh(){

refreshDashboard();

tampilRiwayat();

}

function resetSemua(){

if(confirm("Yakin ingin menghapus semua data?")){

db={

gaji:[],

lembur:[],

pengeluaran:[]

};

simpanDB();

refresh();

alert("Semua data berhasil dihapus");

}

}

setBulanSekarang();

refresh();
