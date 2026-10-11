const LOGO_URL = "https://i.ibb.co/khai-logo.png"; // <-- GANTI LOGO KAU SINI
const BANNERS = ["https://i.ibb.co/banner1.jpg","https://i.ibb.co/banner2.jpg"];
const WA = "601115852234";
const games = [
{name:"Mobile Legends MY",cat:"uid",img:"https://i.imgur.com/8QJ4sQW.jpeg",link:"product.html?game=mlmy"},
{name:"Mobile Legends IN",cat:"other",img:"https://i.imgur.com/8QJ4sQW.jpeg",link:"product.html?game=mlid"},
{name:"Mobile Legends Glo",cat:"other",img:"https://i.imgur.com/8QJ4sQW.jpeg",link:"product.html?game=mlglobal"},
{name:"Free Fire IN",cat:"uid",img:"https://i.imgur.com/3Z1QZ1Q.jpeg",link:"product.html?game=ffid"},
{name:"PUBG Mobile",cat:"uid",img:"https://i.imgur.com/Ql2zA1I.png",link:"product.html?game=pubg"},
{name:"Free Fire MY/SG",cat:"uid",img:"https://i.imgur.com/3Z1QZ1Q.jpeg",link:"product.html?game=ffmy"},
{name:"AFK Journey",cat:"other",img:"https://i.imgur.com/5X2p6yA.png",link:"product.html?game=afk"},
{name:"Age of Empires",cat:"other",img:"https://i.imgur.com/5X2p6yA.png",link:"product.html?game=aoe"},
{name:"Arena Breakout",cat:"uid",img:"https://i.imgur.com/5X2p6yA.png",link:"product.html?game=ab"},
];
function render(id,data){document.getElementById(id).innerHTML=data.map(g=>`<div class="card" onclick="location.href='${g.link}'"><img src="${g.img}"><div class="lb">${g.name}</div></div>`).join('')}
document.getElementById('logo').src=LOGO_URL;document.getElementById('footLogo').src=LOGO_URL;
document.getElementById('waFloat').href=`https://wa.me/${WA}`;document.getElementById('waSide').href=`https://wa.me/${WA}`;document.getElementById('waFoot').innerText=WA;document.getElementById('waNumberDrawer').innerText="🟢 "+WA;document.getElementById('waFoot').href=`https://wa.me/${WA}`;
const bWrap=document.getElementById('banner');bWrap.innerHTML=BANNERS.map(u=>`<img src="${u}">`).join('');let i=0;setInterval(()=>{i=(i+1)%BANNERS.length;bWrap.style.transform=`translateX(-${i*100}%)`},3000);
render('famous',games.slice(0,6));let showAll=false;render('all',games.slice(0,6));
document.getElementById('openMenu').onclick=()=>document.getElementById('menuDrawer').classList.toggle('open');
document.getElementById('themeBtn').onclick=()=>{document.body.classList.toggle('light');document.body.classList.toggle('dark');document.getElementById('themeBtn').innerText=document.body.classList.contains('light')?'🌙':'☀️'};
document.querySelectorAll('.tab').forEach(t=>t.onclick=()=>{document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));t.classList.add('active');const f=t.dataset.f;const fil=f==='all'?games:games.filter(g=>g.cat===f);render('all',showAll?fil:fil.slice(0,6))});
document.getElementById('moreBtn').onclick=e=>{showAll=!showAll;e.target.innerText=showAll?'Show Less':'Show More';const act=document.querySelector('.tab.active').dataset.f;const fil=act==='all'?games:games.filter(g=>g.cat===act);render('all',showAll?fil:fil.slice(0,6))};
setInterval(()=>{const g=games[Math.floor(Math.random()*games.length)];document.getElementById('tText').innerText=`0169****33 just topped up ${g.name} - 5x Weekly Diamond Pass`;document.getElementById('tImg').src=g.img;document.getElementById('toast').classList.add('show');setTimeout(()=>document.getElementById('toast').classList.remove('show'),4000)},8000);
