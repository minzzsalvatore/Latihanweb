<?php
// ⚙️ Konfigurasi koneksi ke database
$host     = "localhost";
$user     = "root";
$pass     = "";
$dbname   = "minzzstore"; // nama database kamu

$conn = mysqli_connect($host, $user, $pass, $dbname);
if (!$conn) {
    die("Koneksi database gagal: " . mysqli_connect_error());
}

session_start();

// Kalau user login, ambil saldo-nya
$saldo_user = 0;
if (isset($_SESSION['user_id'])) {
    $uid = $_SESSION['user_id'];
    $query = mysqli_query($conn, "SELECT saldo FROM users WHERE id='$uid'");
    if ($row = mysqli_fetch_assoc($query)) {
        $saldo_user = $row['saldo'];
    }
}
?>