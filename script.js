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
