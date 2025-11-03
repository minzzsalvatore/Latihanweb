<?php
// === Backend untuk auto topup ===
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $apikey = 'q3EdSMpHrXGrd6qzp3kh';
    $endpoint = 'https://www.synnmlbb.com/api/v1/transaction';

    $user_id = $_POST['user_id'] ?? '';
    $server_id = $_POST['server_id'] ?? '';
    $product_slug = 'mlbb-malaysia';
    $product_type = $_POST['product_type'] ?? '';
    $whatsapp = $_POST['whatsapp'] ?? '';

    $postData = [
        'product_slug' => $product_slug,
        'user_id' => $user_id,
        'server_id' => $server_id,
        'product_type_id' => $product_type,
        'note' => $whatsapp
    ];

    $ch = curl_init($endpoint);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: ' . $apikey,
        'Content-Type: application/json'
    ]);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($postData));
    $response = curl_exec($ch);
    curl_close($ch);

    header('Content-Type: application/json');
    echo $response;
    exit;
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Minzz Salvatore - Top Up MLBB Malaysia 2</title>
<style>
:root{--bg:#04070d;--accent:#009dff;--accent2:#00c6ff;--text:#cfd9e8;--card:#0b1118;font-family:"Poppins",sans-serif;}
*{box-sizing:border-box;margin:0;padding:0}
body{background:var(--bg);color:var(--text);overflow-x:hidden;scroll-behavior:smooth}
#alertPopup{position:fixed;inset:0;background:rgba(0,0,0,.85);display:flex;justify-content:center;align-items:center;z-index:999;transition:opacity .3s ease;}
#alertPopup.hidden{opacity:0;pointer-events:none}
.alert-box{background:#0b111d;border:1px solid rgba(0,157,255,.4);box-shadow:0 0 25px rgba(0,157,255,.7);border-radius:18px;padding:22px 20px;width:90%;max-width:400px;text-align:center;color:#cfd9e8;animation:pop .3s ease;}
@keyframes pop{from{transform:scale(.8);opacity:0}to{transform:scale(1);opacity:1}}
.alert-box h3{color:#00b7ff;margin-bottom:10px}
.alert-box button{background:linear-gradient(135deg,#00b7ff,var(--accent));border:none;color:#fff;border-radius:10px;padding:10px 22px;cursor:pointer;font-weight:600;box-shadow:0 0 12px rgba(0,157,255,.7);transition:.3s}
.alert-box button:hover{transform:scale(1.05)}
header{display:flex;justify-content:space-between;align-items:center;padding:18px 16px;position:sticky;top:0;z-index:50;background:rgba(5,8,14,.9);backdrop-filter:blur(10px);border-bottom:1px solid rgba(255,255,255,.06)}
.logo{display:flex;align-items:center;gap:10px;font-weight:700;color:#cfd9e8}
.logo img{width:44px;height:44px;border-radius:12px;box-shadow:0 0 12px rgba(0,157,255,.5)}
.menu-btn{font-size:26px;cursor:pointer;color:#fff}
.nav-backdrop{position:fixed;inset:0;background:rgba(0,0,0,0.5);opacity:0;pointer-events:none;transition:.25s;z-index:40}
.nav-backdrop.active{opacity:1;pointer-events:auto}
.nav-menu{position:fixed;top:0;left:-100%;width:80%;max-width:360px;height:100%;background:#0b1118;transition:.3s;z-index:50;padding-top:20px;display:flex;flex-direction:column}
.nav-menu.active{left:0}
.nav-item{padding:13px 18px;color:#cfd9e8;text-decoration:none;font-size:15px}
.nav-item:hover{background:rgba(255,255,255,.06);color:#fff}
.banner-container{position:relative;width:90%;max-width:700px;height:230px;margin:25px auto 15px;border-radius:20px;overflow:hidden;background:linear-gradient(145deg,#071324,#041b31);box-shadow:0 0 25px rgba(0,157,255,.3);}
.banner-content{position:relative;z-index:2;display:flex;align-items:center;gap:16px;padding:20px;height:100%;background:rgba(0,0,0,0.35);backdrop-filter:blur(5px);}
.banner-logo{width:90px;height:90px;border-radius:20px;box-shadow:0 0 25px rgba(0,157,255,.7);animation:float 4s ease-in-out infinite alternate;}
@keyframes float{from{transform:translateY(0);}to{transform:translateY(-6px);}}
.banner-text h2{font-size:20px;font-weight:700;color:#fff;text-shadow:0 0 10px rgba(0,157,255,.8);}
.banner-text p{font-size:14px;color:#9bc4ff;margin-top:6px;}
.desc{width:90%;max-width:700px;margin:10px auto 25px;background:#0b1320;border-radius:14px;padding:16px;box-shadow:0 0 20px rgba(0,157,255,.2);cursor:pointer;transition:.3s;}
.desc-content{max-height:0;overflow:hidden;color:#b8c7d9;font-size:14px;opacity:0;transition:max-height .6s ease,opacity .6s ease;}
.desc.active .desc-content{max-height:200px;opacity:1;margin-top:8px;}
.step-label{width:90%;max-width:700px;margin:25px auto 10px;display:flex;align-items:center;gap:10px}
.step-circle{width:30px;height:30px;border-radius:50%;background:var(--accent);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;box-shadow:0 0 12px rgba(0,157,255,.7)}
.category{width:90%;max-width:700px;margin:20px auto}
.cat-btns{display:flex;gap:10px;overflow-x:auto;margin-bottom:14px}
.cat-btn{padding:10px 18px;border:none;border-radius:10px;color:#fff;font-weight:600;background:#0c1624;cursor:pointer}
.cat-btn.active,.cat-btn:hover{background:linear-gradient(135deg,#00b7ff,#007bff);box-shadow:0 0 15px rgba(0,157,255,.6)}
.price-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}
.price-item{background:#0b111d;padding:14px;border-radius:14px;text-align:center;border:1px solid rgba(255,255,255,.06);transition:.3s;cursor:pointer}
.price-item:hover{transform:translateY(-3px);box-shadow:0 0 15px rgba(0,157,255,.5)}
.price-item.active{border:1px solid var(--accent)}
.price-item img{width:36px;height:36px;margin-bottom:6px}
.btn-blue{display:block;width:90%;margin:25px auto 10px;padding:14px;border:none;border-radius:12px;background:linear-gradient(135deg,#00b7ff,#007bff);color:#fff;font-weight:700;font-size:15px;text-align:center;cursor:pointer;box-shadow:0 0 25px rgba(0,157,255,.5);transition:.3s}
.btn-blue:hover{transform:scale(1.05)}
#resultBox{width:90%;max-width:700px;margin:20px auto;background:#0b111d;border-radius:12px;padding:16px;text-align:center;display:none}
#resultBox.success{border:1px solid #00b7ff;color:#aef}
#resultBox.error{border:1px solid #ff4b4b;color:#ffaaaa}
</style>
</head>
<body>
<div id="alertPopup"><div class="alert-box"><h3>⚠️ Peringatan!</h3><p>Pastikan data ID, Server, dan Nomor WhatsApp kamu benar sebelum melakukan transaksi.</p><button id="closeAlert">Tutup</button></div></div>

<header>
  <div class="logo"><img src="https://f.top4top.io/p_3592x38860.png" alt="logo"><span>Minzz Salvatore</span></div>
  <div class="menu-btn" onclick="toggleMenu()">☰</div>
</header>
<div class="nav-backdrop" id="navBackdrop" onclick="toggleMenu()"></div>
<div class="nav-menu" id="navMenu">
  <a href="index.html" class="nav-item">🏠 Beranda</a>
  <a href="status.html" class="nav-item">🔍 Cek Transaksi</a>
</div>

<main>
  <div class="banner-container">
    <div class="banner-content">
      <img class="banner-logo" src="https://d.top4top.io/p_3592ov5d30.png" alt="MLBB Logo">
      <div class="banner-text"><h2>MLBB Malaysia 2</h2><p>by Moonton</p></div>
    </div>
  </div>

  <div class="desc active" id="descBox" onclick="toggleDesc()">
    <h3>Deskripsi <span>⬇️</span></h3>
    <div class="desc-content">
      Minzz Salvatore — pilihan terbaik untuk Top Up Mobile Legends!  
      Dapatkan Diamond MLBB dengan harga bersahabat, proses cepat, dan layanan profesional 24 jam.
    </div>
  </div>

  <form id="topupForm">
    <div class="step-label"><div class="step-circle">1</div><h3>Pilih Nominal</h3></div>
    <section class="category"><div class="cat-btns">
      <button class="cat-btn active" data-type="1">86 Diamond</button>
      <button class="cat-btn" data-type="2">172 Diamond</button>
    </div></section>

    <div class="section-header"><div class="step-circle">2</div><h3>ID Player</h3></div>
    <div class="section-card"><input name="user_id" placeholder="User ID"><input name="server_id" placeholder="Server ID"></div>

    <div class="section-header"><div class="step-circle">3</div><h3>No. WhatsApp</h3></div>
    <div class="section-card"><input name="whatsapp" placeholder="6014xxxxxxx"></div>

    <button class="btn-blue" type="submit">Konfirmasi Pesanan</button>
  </form>

  <div id="resultBox"></div>
</main>

<script>
document.getElementById("closeAlert").onclick=()=>{const p=document.getElementById("alertPopup");p.classList.add("hidden");setTimeout(()=>p.remove(),300);}
function toggleMenu(){const m=document.getElementById("navMenu");const b=document.getElementById("navBackdrop");const a=m.classList.toggle("active");b.classList.toggle("active",a);}
function toggleDesc(){document.getElementById("descBox").classList.toggle("active");}

const form=document.getElementById('topupForm');
const resultBox=document.getElementById('resultBox');
form.addEventListener('submit',async e=>{
  e.preventDefault();
  const fd=new FormData(form);
  fd.append('product_type',document.querySelector('.cat-btn.active').dataset.type);
  resultBox.style.display='block';
  resultBox.innerHTML='⏳ Memproses pesanan...';
  const res=await fetch('',{method:'POST',body:fd});
  const data=await res.json();
  if(data.success){
    resultBox.className='success';
    resultBox.innerHTML=`✅ <b>${data.message}</b><br>Invoice: ${data.invoice}<br>Status: Proses`;
  }else{
    resultBox.className='error';
    resultBox.innerHTML=`❌ ${data.message||'Gagal memproses transaksi.'}`;
  }
});
</script>
</body>
</html>