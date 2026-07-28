*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:Arial,Helvetica,sans-serif;
}

body{
    background:#f4f6f9;
    color:#222;
    padding-bottom:90px;
}

.header{
    background:#1565C0;
    color:white;
    padding:20px;
    text-align:center;
    border-radius:0 0 20px 20px;
    box-shadow:0 3px 12px rgba(0,0,0,.2);
}

.header h1{
    font-size:28px;
}

.header p{
    margin-top:8px;
    opacity:.9;
}

.dashboard{
    padding:15px;
    display:grid;
    grid-template-columns:repeat(2,1fr);
    gap:12px;
}

.card{
    background:white;
    border-radius:16px;
    padding:16px;
    box-shadow:0 3px 10px rgba(0,0,0,.08);
}

.card h3{
    color:#666;
    font-size:15px;
}

.card h2{
    margin-top:10px;
    color:#1565C0;
}

input,
select,
textarea{

width:100%;

padding:12px;

margin-top:10px;

border-radius:10px;

border:1px solid #ccc;

font-size:15px;

}

button{

width:100%;

padding:12px;

margin-top:10px;

border:none;

border-radius:10px;

background:#1565C0;

color:white;

font-size:15px;

cursor:pointer;

transition:.2s;

}

button:hover{

transform:scale(.98);

background:#0D47A1;

}

.bottom-nav{

position:fixed;

bottom:0;

left:0;

right:0;

display:grid;

grid-template-columns:repeat(6,1fr);

background:white;

padding:10px;

box-shadow:0 -3px 10px rgba(0,0,0,.15);

}

.bottom-nav button{

background:none;

color:#1565C0;

font-size:24px;

margin:0;

padding:10px;

}

.bottom-nav button:hover{

background:#E3F2FD;

border-radius:10px;

}
