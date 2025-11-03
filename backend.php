<?php
session_start();

// === CONFIG DATABASE ===
$host = "localhost";
$user = "root";
$pass = "";
$db   = "minzzstore";

$conn = mysqli_connect($host, $user, $pass, $db);
if (!$conn) {
    echo json_encode(["error" => "Koneksi database gagal"]);
    exit;
}

header("Content-Type: application/json; charset=UTF-8");

// Default session
if (!isset($_SESSION['logged_in'])) {
    $_SESSION['logged_in'] = false;
}

$action = $_GET['action'] ?? '';

/* ==== CHECK LOGIN STATUS ==== */
if ($action === 'checkLogin') {
    echo json_encode([
        "loggedIn" => $_SESSION['logged_in'],
        "username" => $_SESSION['logged_in'] ? ($_SESSION['username'] ?? 'User') : null,
        "saldo"    => $_SESSION['logged_in'] ? ($_SESSION['saldo'] ?? 0) : 0
    ]);
    exit;
}

/* ==== LOGOUT ==== */
if ($action === 'logout') {
    $_SESSION = [];
    session_destroy();
    echo json_encode(["success" => true, "message" => "Berhasil logout"]);
    exit;
}

/* ==== LOGIN ==== */
if ($action === 'login') {
    $data = json_decode(file_get_contents("php://input"), true);
    $user = mysqli_real_escape_string($conn, trim($data['username'] ?? ''));
    $pass = trim($data['password'] ?? '');

    if (!$user || !$pass) {
        echo json_encode(["success" => false, "message" => "Kolom tidak boleh kosong"]);
        exit;
    }

    $query = mysqli_query($conn, "SELECT * FROM users WHERE username='$user' LIMIT 1");
    if (mysqli_num_rows($query) > 0) {
        $row = mysqli_fetch_assoc($query);
        if (password_verify($pass, $row['password'])) {
            $_SESSION['logged_in'] = true;
            $_SESSION['user_id'] = $row['id'];
            $_SESSION['username'] = $row['username'];
            $_SESSION['saldo'] = $row['saldo'];
            echo json_encode([
                "success" => true,
                "username" => $row['username'],
                "saldo" => $row['saldo']
            ]);
        } else {
            echo json_encode(["success" => false, "message" => "Password salah"]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Akun tidak ditemukan"]);
    }
    exit;
}

/* ==== REGISTER ==== */
if ($action === 'register') {
    $data = json_decode(file_get_contents("php://input"), true);
    $user = mysqli_real_escape_string($conn, trim($data['username'] ?? ''));
    $pass = trim($data['password'] ?? '');

    if (!$user || !$pass) {
        echo json_encode(["success" => false, "message" => "Kolom tidak boleh kosong"]);
        exit;
    }

    $check = mysqli_query($conn, "SELECT id FROM users WHERE username='$user'");
    if (mysqli_num_rows($check) > 0) {
        echo json_encode(["success" => false, "message" => "Username sudah digunakan"]);
        exit;
    }

    $hashed = password_hash($pass, PASSWORD_DEFAULT);

    $insert = mysqli_query($conn, "INSERT INTO users (username, password, saldo) VALUES ('$user', '$hashed', 0)");
    if ($insert) {
        echo json_encode(["success" => true, "message" => "Akun berhasil dibuat"]);
    } else {
        echo json_encode(["success" => false, "message" => "Gagal menyimpan ke database"]);
    }
    exit;
}

/* ==== CEK SALDO ==== */
if ($action === 'getSaldo') {
    if (!$_SESSION['logged_in']) {
        echo json_encode(["success" => false, "message" => "Belum login"]);
        exit;
    }
    $uid = $_SESSION['user_id'];
    $res = mysqli_query($conn, "SELECT saldo FROM users WHERE id='$uid'");
    if ($row = mysqli_fetch_assoc($res)) {
        $_SESSION['saldo'] = $row['saldo'];
        echo json_encode(["success" => true, "saldo" => $row['saldo']]);
    } else {
        echo json_encode(["success" => false, "message" => "User tidak ditemukan"]);
    }
    exit;
}

/* ==== DEFAULT ==== */
echo json_encode(["message" => "API backend aktif"]);
?>