// ===== KAU GANTI LINK SINI JE 100% =====
const LOGO_URL = "https://i.ibb.co/logo-kau.png"; // link logo kau
const BANNER_URLS = [
  "https://i.ibb.co/banner1.jpg",
  "https://i.ibb.co/banner2.jpg"
];
const WHATSAPP_CS = "601115852234";
// =======================================

const famousGames = [
 {name:"Mobile Legends MY",cat:"uid",img:"https://i.imgur.com/8QJ4sQW.jpeg",link:"product.html?game=ml-my"},
 {name:"Mobile Legends I...",cat:"other",img:"https://i.imgur.com/8QJ4sQW.jpeg",link:"product.html?game=ml-indo"},
 {name:"Mobile Legends ...",cat:"other",img:"https://i.imgur.com/8QJ4sQW.jpeg",link:"product.html?game=ml-global"},
 {name:"Free Fire Indones...",cat:"uid",img:"https://i.imgur.com/3Z1QZ1Q.jpeg",link:"product.html?game=ff-indo"},
 {name:"PUBG Mobile",cat:"uid",img:"https://i.imgur.com/Ql2zA1I.png",link:"product.html?game=pubg"},
 {name:"Free Fire MY/SG",cat:"uid",img:"https://i.imgur.com/3Z1QZ1Q.jpeg",link:"product.html?game=ff-my"},
];
const allGames = [...famousGames,
 {name:"AFK Journey",cat:"other",img:"https://i.imgur.com/5X2p6yA.png",link:"product.html?game=afk"},
 {name:"Age of Empires",cat:"other",img:"https://i.imgur.com/5X2p6yA.png",link:"product.html?game=aoe"},
 {name:"Arena Breakout",cat:"uid",img:"https://i.imgur.com/5X2p6yA.png",link:"product.html?game=arena"},
];

let showAll = false;
function renderGrid(el, data){
  el.innerHTML = data.map(g=>`
    <div class="game-card" onclick="location.href='${g.link}'">
      <img src="${g.img}"><div class="flag">🇮🇩</div><div class="label">${g.name}</div>
    </div>`).join('');
}
function init(){
  document.getElementById('logoImg').src = LOGO_URL;
  document.getElementById('footerLogo').src = LOGO_URL;
  document.getElementById('waFloat').href = `https://wa.me/${WHATSAPP_CS}`;
  document.getElementById('waLinkSide').href = `https://wa.me/${WHATSAPP_CS}`;
  document.getElementById('waFooter').innerText = WHATSAPP_CS;
  
  // Banner slider
  const slider = document.getElementById('bannerSlider');
  slider.innerHTML = BANNER_URLS.map(u=>`<img src="${u}">`).join('');
  let idx=0;
  setInterval(()=>{idx=(idx+1)%BANNER_URLS.length; slider.style.transform=`translateX(-${idx*100}%)`},3000);

  renderGrid(document.getElementById('famousGrid'), famousGames);
  renderGrid(document.getElementById('allServicesGrid'), allGames.slice(0,6));

  // Theme toggle putih hitam
  document.getElementById('themeBtn').onclick = ()=>{
    document.body.classList.toggle('light');
    document.body.classList.toggle('dark');
    document.getElementById('themeBtn').innerText = document.body.classList.contains('light') ? '🌙' : '☀️';
  };
  // Sidebar
  document.getElementById('menuBtn').onclick = ()=> document.getElementById('sidebar').classList.toggle('open');
  // Filter
  document.querySelectorAll('.tab').forEach(t=>t.onclick=()=>{
    document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active')); t.classList.add('active');
    const f=t.dataset.filter; let filtered = f==='semua'? allGames : allGames.filter(x=>x.cat===f);
    renderGrid(document.getElementById('allServicesGrid'), showAll?filtered:filtered.slice(0,6));
  });
  document.getElementById('showMoreBtn').onclick = (e)=>{
    showAll=!showAll; e.target.innerText=showAll?'Show Less':'Show More';
    renderGrid(document.getElementById('allServicesGrid'), showAll?allGames:allGames.slice(0,6));
  };
  // Toast PRODUCT SOLD
  setInterval(()=>{
    const g = famousGames[Math.floor(Math.random()*famousGames.length)];
    document.getElementById('toastText').innerText=`0169****33 just topped up ${g.name} - 5x Weekly Diamond Pass`;
    document.getElementById('toastImg').src=g.img;
    document.getElementById('toast').classList.add('show');
    setTimeout(()=>document.getElementById('toast').classList.remove('show'),4000);
  },8000);
}
init();
