// UBAH LOGO & BANNER & WA SINI JE
const LOGO_URL = "https://i.imgur.com/8QJ4sQW.jpeg";
const BANNER_URL = ["https://i.imgur.com/8QJ4sQW.jpeg","https://i.imgur.com/3Z1QZ1Q.jpeg"];
const WA = "601115852234";

const data = [
{name:"Mobile Legends MY",jenis:"uid",gambar:"https://i.imgur.com/8QJ4sQW.jpeg",link:"product.html?game=mlmy"},
{name:"Mobile Legends ID",jenis:"other",gambar:"https://i.imgur.com/8QJ4sQW.jpeg",link:"product.html?game=mlid"},
{name:"Mobile Legends Global",jenis:"other",gambar:"https://i.imgur.com/8QJ4sQW.jpeg",link:"product.html?game=mlglobal"},
{name:"Free Fire IN",jenis:"uid",gambar:"https://i.imgur.com/3Z1QZ1Q.jpeg",link:"product.html?game=ffid"},
{name:"PUBG Mobile",jenis:"uid",gambar:"https://i.imgur.com/Ql2zA1I.png",link:"product.html?game=pubg"},
{name:"Free Fire MY/SG",jenis:"uid",gambar:"https://i.imgur.com/3Z1QZ1Q.jpeg",link:"product.html?game=ffmy"},
{name:"AFK Journey",jenis:"other",gambar:"https://i.imgur.com/5X2p6yA.png",link:"product.html?game=aoe"},
{name:"Arena Breakout",jenis:"uid",gambar:"https://i.imgur.com/5X2p6yA.png",link:"product.html?game=arena"},
];

let semua = false;

function papar(id, list){
document.getElementById(id).innerHTML = list.map(g=>`
<div class="kad" onclick="location.href='${g.link}'">
<img src="${g.gambar}"><div class="label">${g.name}</div>
</div>`).join('');
}

document.getElementById('logoTop').src = LOGO_URL;
document.getElementById('logoBawah').src = LOGO_URL;
document.getElementById('waFloat').href = `https://wa.me/${WA}`;
document.getElementById('waSisi').href = `https://wa.me/${WA}`;
document.getElementById('waBawah').innerText = "🟢 "+WA;
document.getElementById('waBawah').href = `https://wa.me/${WA}`;

const track = document.getElementById('track');
track.innerHTML = BANNER_URL.map(u=>`<img src="${u}">`).join('');
let i = 0;
setInterval(()=>{ i=(i+1)%BANNER_URL.length; track.style.transform=`translateX(-${i*100}%)`; },3000);

papar('gridFamous', data.slice(0,6));
papar('gridAll', data.slice(0,6));

document.getElementById('btnMenu').onclick = ()=> document.getElementById('drawer').classList.toggle('buka');
document.getElementById('btnTheme').onclick = ()=> document.body.classList.toggle('light');
document.getElementById('btnMore').onclick = (e)=>{ semua=!semua; e.target.innerText=semua?'Show Less':'Show More'; let j=document.querySelector('.tab.aktif').dataset.jenis; let f=j==='semua'?data:data.filter(x=>x.jenis===j); papar('gridAll', semua?f:f.slice(0,6)); };
document.querySelectorAll('.tab').forEach(t=>{
t.onclick=()=>{
document.querySelectorAll('.tab').forEach(x=>x.classList.remove('aktif'));
t.classList.add('aktif');
let j=t.dataset.jenis;
let f=j==='semua'?data:data.filter(x=>x.jenis===j);
papar('gridAll', semua?f:f.slice(0,6));
};
});
document.getElementById('inputCari').oninput = (e)=>{
let k=e.target.value.toLowerCase();
let h=data.filter(x=>x.name.toLowerCase().includes(k));
papar('gridFamous', h);
papar('gridAll', h.slice(0,6));
};
