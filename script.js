// ==========================
// Salary Manager Pro V3
// ==========================

const TARIF = 44000;

const FAKTOR = {
  "1": 1.5,
  "1.5": 2.5,
  "3.5": 5.5,
  "4.5": 7.5
};

let db = JSON.parse(localStorage.getItem("salaryManagerV3")) || {

  gaji: [],

  lembur: [],

  pengeluaran: []

};

function simpanDB(){

localStorage.setItem(

"salaryManagerV3",

JSON.stringify(db)

);

}

function rupiah(n){

return "Rp " +

Number(n).toLocaleString("id-ID");

}

function totalGaji(){

return db.gaji.reduce(

(a,b)=>a+b.nominal,

0

);

}

function totalLembur(){

return db.lembur.reduce(

(a,b)=>a+b.nominal,

0

);

}

function totalKeluar(){

return db.pengeluaran.reduce(

(a,b)=>a+b.nominal,

0

);

}

function refreshDashboard(){

const g=totalGaji();

const l=totalLembur();

const k=totalKeluar();

document.getElementById("gaji").innerHTML=

rupiah(g);

document.getElementById("lembur").innerHTML=

rupiah(l);

document.getElementById("pengeluaran").innerHTML=

rupiah(k);

document.getElementById("saldo").innerHTML=

rupiah(g+l-k);

document.getElementById("transaksi").innerHTML=

db.gaji.length+

db.lembur.length+

db.pengeluaran.length;

}

const hari=new Date();

document.getElementById("today").innerHTML=

hari.toLocaleDateString(

"id-ID",

{

weekday:"long",

day:"numeric",

month:"long",

year:"numeric"

}

);

refreshDashboard();

function menuDashboard(){

document.getElementById("content").innerHTML=`
<div class="card">
<h2>Dashboard</h2>
<p>Selamat datang di Salary Manager Pro.</p>
</div>
`;

}

function menuGaji(){

document.getElementById("content").innerHTML=`

<div class="card">

<h2>Tambah Gaji</h2>

<input type="date" id="tglGaji">

<input type="number" id="nominalGaji" placeholder="Nominal Gaji">

<button onclick="simpanGaji()">

Simpan Gaji

</button>

</div>

`;

}

function simpanGaji(){

const tanggal=document.getElementById("tglGaji").value;

const nominal=Number(document.getElementById("nominalGaji").value);

if(!tanggal||nominal<=0){

alert("Lengkapi data");

return;

}

db.gaji.push({

tanggal,

nominal

});

simpanDB();

refreshDashboard();

alert("Gaji berhasil disimpan");

menuDashboard();

}

function menuLembur(){

document.getElementById("content").innerHTML=`

<div class="card">

<h2>Tambah Lembur</h2>

<input type="date" id="tglLembur">

<select id="jamLembur">

<option value="1">1 Jam</option>

<option value="1.5">1.5 Jam</option>

<option value="3.5">3.5 Jam</option>

<option value="4.5">4.5 Jam</option>

</select>

<button onclick="simpanLembur()">

Simpan Lembur

</button>

</div>

`;

}

function simpanLembur(){

const tanggal=document.getElementById("tglLembur").value;

const jam=document.getElementById("jamLembur").value;

if(!tanggal){

alert("Pilih tanggal");

return;

}

db.lembur.push({

tanggal,

jam,

nominal:FAKTOR[jam]*TARIF

});

simpanDB();

refreshDashboard();

alert("Lembur berhasil disimpan");

menuDashboard();

}

menuDashboard();

function menuPengeluaran(){

document.getElementById("content").innerHTML=`

<div class="card">

<h2>Tambah Pengeluaran</h2>

<input type="date" id="tglKeluar">

<input type="text" id="namaKeluar" placeholder="Nama Pengeluaran">

<input type="number" id="nominalKeluar" placeholder="Nominal">

<button onclick="simpanPengeluaran()">

Simpan Pengeluaran

</button>

</div>

`;

}

function simpanPengeluaran(){

const tanggal=document.getElementById("tglKeluar").value;

const nama=document.getElementById("namaKeluar").value;

const nominal=Number(document.getElementById("nominalKeluar").value);

if(!tanggal||nama==""||nominal<=0){

alert("Lengkapi data");

return;

}

db.pengeluaran.push({

tanggal,

nama,

nominal

});

simpanDB();

refreshDashboard();

alert("Pengeluaran berhasil disimpan");

menuDashboard();

}

function menuLaporan(){

let html=`

<div class="card">

<h2>Laporan Bulan Ini</h2>

<table>

<tr>

<td>Total Gaji</td>

<td>${rupiah(totalGaji())}</td>

</tr>

<tr>

<td>Total Lembur</td>

<td>${rupiah(totalLembur())}</td>

</tr>

<tr>

<td>Total Pengeluaran</td>

<td>${rupiah(totalKeluar())}</td>

</tr>

<tr>

<td><b>Total Saldo</b></td>

<td><b>${rupiah(totalGaji()+totalLembur()-totalKeluar())}</b></td>

</tr>

</table>

</div>

`;

document.getElementById("content").innerHTML=html;

}

function menuSetting(){

document.getElementById("content").innerHTML=`

<div class="card">

<h2>Pengaturan</h2>

<button onclick="resetSemua()">

Reset Semua Data

</button>

</div>

`;

}

function resetSemua(){

if(confirm("Hapus semua data?")){

db={

gaji:[],

lembur:[],

pengeluaran:[]

};

simpanDB();

refreshDashboard();

menuDashboard();

}

}

// =======================
// Filter Bulan
// =======================

const filter = document.getElementById("filterBulan");

const sekarang = new Date();

filter.value =
`${sekarang.getFullYear()}-${String(sekarang.getMonth()+1).padStart(2,"0")}`;

filter.addEventListener("change",()=>{

refreshDashboard();

});

function dataBulan(list){

return list.filter(item=>{

return item.tanggal.startsWith(filter.value);

});

}
