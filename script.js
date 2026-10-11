// === KAU UBAH LINK SINI JE ===
const LOGO = "https://i.ibb.co/placeholder-logo.png"; // ganti link logo kau
const BANNER = [
"https://i.imgur.com/8QJ4sQW.jpeg",
"https://i.imgur.com/3Z1QZ1Q.jpeg"
];
const NO_WA = "601115852234";
// =============================

const dataGame = [
{name:"Mobile Legends MY",jenis:"uid",gambar:"https://i.imgur.com/8QJ4sQW.jpeg",link:"product.html?game=mlmy"},
{name:"Mobile Legends ID",jenis:"other",gambar:"https://i.imgur.com/8QJ4sQW.jpeg",link:"product.html?game=mlid"},
{name:"Mobile Legends Global",jenis:"other",gambar:"https://i.imgur.com/8QJ4sQW.jpeg",link:"product.html?game=mlglobal"},
{name:"Free Fire IN",jenis:"uid",gambar:"https://i.imgur.com/3Z1QZ1Q.jpeg",link:"product.html?game=ffid"},
{name:"PUBG Mobile",jenis:"uid",gambar:"https://i.imgur.com/Ql2zA1I.png",link:"product.html?game=pubg"},
{name:"Free Fire MY/SG",jenis:"uid",gambar:"https://i.imgur.com/3Z1QZ1Q.jpeg",link:"product.html?game=ffmy"},
{name:"AFK Journey",jenis:"other",gambar:"https://i.imgur.com/5X2p6yA.png",link:"product.html?game=afk"},
{name:"Age of Empires",jenis:"other",gambar:"https://i.imgur.com/5X2p6yA.png",link:"product.html?game=aoe"},
{name:"Arena Breakout",jenis:"uid",gambar:"https://i.imgur.com/5X2p6yA.png",link:"product.html?game=arena"},
];

let tunjukSemua = false;

function papar(id, senarai){
document.getElementById(id).innerHTML = senarai.map(g=>`
<div class="card" onclick="location.href='${g.link}'">
<img src="${g.gambar}"><div class="lb">${g.name}</div>
</div>`).join('');
}

function mula(){
document.getElementById('logoTop').src = LOGO;
document.getElementById('logoFoot').src = LOGO;
document.getElementById('waFloat').href = `https://wa.me/${NO_WA}`;
document.getElementById('waSide').href = `https://wa.me/${NO_WA}`;
document.getElementById('waFoot').innerText = "🟢 " + NO_WA;
document.getElementById('waFoot').href = `https://wa.me/${NO_WA}`;

const track = document.getElementById('bannerTrack');
track.innerHTML = BANNER.map(b=>`<img src="${b}">`).join('');
let index = 0;
setInterval(()=>{
index = (index+1) % BANNER.length;
track.style.transform = `translateX(-${index*100}%)`;
},3000);

papar('gridFamous', dataGame.slice(0,6));
papar('gridAll', dataGame.slice(0,6));

document.getElementById('btnMenu').onclick = ()=> document.getElementById('drawer').classList.toggle('open');
document.getElementById('btnTheme').onclick = ()=>{
document.body.classList.toggle('light');
document.body.classList.toggle('dark');
document.getElementById('btnTheme').innerText = document.body.classList.contains('light') ? '🌙' : '☀️';
};
document.querySelectorAll('.tab').forEach(tab=>{
tab.onclick = ()=>{
document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
tab.classList.add('active');
let tapis = tab.dataset.k === 'semua' ? dataGame : dataGame.filter(g=>g.jenis===tab.dataset.k);
papar('gridAll', tunjukSemua ? tapis : tapis.slice(0,6));
};
});
document.getElementById('btnMore').onclick = (e)=>{
tunjukSemua = !tunjukSemua;
e.target.innerText = tunjukSemua ? 'Show Less' : 'Show More';
let aktif = document.querySelector('.tab.active').dataset.k;
let tapis = aktif === 'semua' ? dataGame : dataGame.filter(g=>g.jenis===aktif);
papar('gridAll', tunjukSemua ? tapis : tapis.slice(0,6));
};
document.getElementById('inputSearch').oninput = (e)=>{
let cari = e.target.value.toLowerCase();
let hasil = dataGame.filter(g=>g.name.toLowerCase().includes(cari));
papar('gridFamous', hasil);
papar('gridAll', hasil.slice(0,6));
};

// toast jualan
setInterval(()=>{
let g = dataGame[Math.floor(Math.random()*dataGame.length)];
document.getElementById('toastText').innerText = `0169****33 baru topup ${g.name} - 5x Weekly Diamond Pass`;
document.getElementById('toastImg').src = g.gambar;
document.getElementById('toast').classList.add('show');
setTimeout(()=>document.getElementById('toast').classList.remove('show'),4000);
},8000);
}
mula();
