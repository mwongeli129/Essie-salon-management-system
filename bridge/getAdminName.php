<?php
// getAdminName.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "E-Attendance";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT name FROM users WHERE role='admin' LIMIT 1"; // or use id to identify the admin
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo json_encode(['admin_name' => $row['name']]);
} else {
    echo json_encode(['admin_name' => '']);
}

$conn->close();
?>
