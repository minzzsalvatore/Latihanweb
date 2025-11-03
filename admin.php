<?php
session_start();
require_once "database.php"; // koneksi database

// Cek login admin
if (!isset($_SESSION['logged_in']) || $_SESSION['username'] !== 'admin') {
    header("Location: login.html");
    exit;
}

// Tambah saldo user
if (isset($_POST['tambah_saldo'])) {
    $user_id = $_POST['user_id'];
    $jumlah = floatval($_POST['jumlah']);

    $update = mysqli_query($conn, "UPDATE users SET saldo = saldo + '$jumlah' WHERE id='$user_id'");
    if ($update) {
        $msg = "✅ Saldo berhasil ditambahkan!";
    } else {
        $msg = "❌ Gagal menambah saldo!";
    }
}

// Kurangi saldo user
if (isset($_POST['kurang_saldo'])) {
    $user_id = $_POST['user_id'];
    $jumlah = floatval($_POST['jumlah']);

    $update = mysqli_query($conn, "UPDATE users SET saldo = saldo - '$jumlah' WHERE id='$user_id'");
    if ($update) {
        $msg = "✅ Saldo berhasil dikurangi!";
    } else {
        $msg = "❌ Gagal mengurangi saldo!";
    }
}

// Ambil semua user
$users = mysqli_query($conn, "SELECT id, username, saldo, created_at FROM users ORDER BY id DESC");
?>

<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Panel Admin - MinzzStore</title>
<style>
body {
    font-family: Poppins, sans-serif;
    background: #04070d;
    color: #fff;
    margin: 0;
    padding: 0;
}
.container {
    max-width: 900px;
    margin: 50px auto;
    padding: 20px;
    background: #0b111d;
    border-radius: 14px;
    box-shadow: 0 0 25px rgba(0,157,255,.3);
}
h1 {
    text-align: center;
    color: #00b7ff;
}
table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}
th, td {
    border-bottom: 1px solid rgba(255,255,255,.1);
    padding: 10px;
    text-align: center;
}
th {
    color: #00b7ff;
}
form {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 5px;
}
input {
    background: #0b1320;
    border: 1px solid #007bff;
    color: #fff;
    padding: 5px 10px;
    border-radius: 8px;
    width: 80px;
}
button {
    background: linear-gradient(135deg,#00b7ff,#007bff);
    border: none;
    padding: 6px 12px;
    border-radius: 8px;
    color: #fff;
    cursor: pointer;
    font-weight: 600;
}
button:hover {
    opacity: 0.8;
}
.msg {
    text-align: center;
    margin-top: 10px;
    color: #00ff99;
}
.logout {
    display: block;
    text-align: center;
    margin-top: 20px;
    color: #ff5555;
    text-decoration: none;
    font-weight: 600;
}
</style>
</head>
<body>

<div class="container">
    <h1>👑 Panel Admin MinzzStore</h1>

    <?php if(isset($msg)) echo "<p class='msg'>$msg</p>"; ?>

    <table>
        <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Saldo (RM)</th>
            <th>Dibuat</th>
            <th>Aksi</th>
        </tr>

        <?php while($u = mysqli_fetch_assoc($users)): ?>
        <tr>
            <td><?= $u['id'] ?></td>
            <td><?= htmlspecialchars($u['username']) ?></td>
            <td>RM <?= number_format($u['saldo'], 2) ?></td>
            <td><?= $u['created_at'] ?></td>
            <td>
                <form method="POST">
                    <input type="hidden" name="user_id" value="<?= $u['id'] ?>">
                    <input type="number" step="0.01" name="jumlah" placeholder="Jumlah">
                    <button type="submit" name="tambah_saldo">+</button>
                    <button type="submit" name="kurang_saldo">−</button>
                </form>
            </td>
        </tr>
        <?php endwhile; ?>
    </table>

    <a href="backend.php?action=logout" class="logout">🚪 Logout</a>
</div>

</body>
</html>