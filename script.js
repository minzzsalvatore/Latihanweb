const LOGO_URL = "https://i.imgur.com/Ql2zA1I.png";
const BANNER_URL = ["https://i.imgur.com/8QJ4sQW.jpeg","https://i.imgur.com/3Z1QZ1Q.jpeg"];
const WA = "601115852234";

const data = [
{name:"Mobile Legends MY",jenis:"uid",gambar:"https://i.imgur.com/8QJ4sQW.jpeg",link:"product.html"},
{name:"Mobile Legends ID",jenis:"other",gambar:"https://i.imgur.com/8QJ4sQW.jpeg",link:"product.html"},
{name:"Mobile Legends Global",jenis:"other",gambar:"https://i.imgur.com/8QJ4sQW.jpeg",link:"product.html"},
{name:"Free Fire IN",jenis:"uid",gambar:"https://i.imgur.com/3Z1QZ1Q.jpeg",link:"product.html"},
{name:"PUBG Mobile",jenis:"uid",gambar:"https://i.imgur.com/Ql2zA1I.png",link:"product.html"},
{name:"Free Fire MY/SG",jenis:"uid",gambar:"https://i.imgur.com/3Z1QZ1Q.jpeg",link:"product.html"},
{name:"AFK Journey",jenis:"other",gambar:"https://i.imgur.com/5X2p6yA.png",link:"product.html"},
{name:"Arena Breakout",jenis:"uid",gambar:"https://i.imgur.com/5X2p6yA.png",link:"product.html"},
];

function papar(id, list){
let el = document.getElementById(id);
el.innerHTML = list.map(g=>`<div class="kad" onclick="location.href='${g.link}'"><img src="${g.gambar}"><span>${g.name}</span></div>`).join('');
}

document.getElementById('logoTop').src = LOGO_URL;
document.getElementById('logoBawah').src = LOGO_URL;
document.getElementById('waFloat').href = "https://wa.me/"+WA;
document.getElementById('waSisi').href = "https://wa.me/"+WA;
document.getElementById('waBawah').innerText = "🟢 "+WA;
document.getElementById('waBawah').href = "https://wa.me/"+WA;

let track = document.getElementById('track');
track.innerHTML = BANNER_URL.map(u=>`<img src="${u}">`).join('');
let idx = 0;
setInterval(()=>{ idx=(idx+1)%BANNER_URL.length; track.style.transform=`translateX(-${idx*100}%)`; },3000);

papar('gridFamous', data.slice(0,6));
let semua = false;
papar('gridAll', data.slice(0,6));

document.getElementById('btnMenu').onclick = ()=> document.getElementById('drawer').classList.toggle('buka');
document.getElementById('btnTheme').onclick = ()=> document.body.classList.toggle('light');
document.getElementById('btnMore').onclick = (e)=>{ semua=!semua; e.target.innerText=semua?'Show Less':'Show More'; let j=document.querySelector('.tab.aktif').dataset.jenis; let f=j=='semua'?data:data.filter(x=>x.jenis==j); papar('gridAll', semua?f:f.slice(0,6)); };
document.querySelectorAll('.tab').forEach(t=>{
t.onclick=()=>{
document.querySelectorAll('.tab').forEach(x=>x.classList.remove('aktif'));
t.classList.add('aktif');
let j=t.dataset.jenis;
let f=j=='semua'?data:data.filter(x=>x.jenis==j);
papar('gridAll', semua?f:f.slice(0,6));
};
});
document.getElementById('inputCari').oninput = (e)=>{
let h=data.filter(x=>x.name.toLowerCase().includes(e.target.value.toLowerCase()));
papar('gridFamous', h);
papar('gridAll', h);
};
