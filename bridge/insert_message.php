<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "winnie";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(array("error" => "Connection failed: " . $conn->connect_error)));
}

// Retrieve POST data
$user_name = $_POST['user_name'];
$user_email = $_POST['user_email'];
$user_tel = $_POST['user_tel'];
$message = $_POST['message'];

// Prepare SQL statement
$sql = "INSERT INTO messages (user_name, user_email, user_tel, message, created_at)
        VALUES ('$user_name', '$user_email', '$user_tel', '$message', NOW())";

if ($conn->query($sql) === TRUE) {
    echo json_encode(array("success" => true));
} else {
    echo json_encode(array("error" => "Error: " . $sql . "<br>" . $conn->error));
}

$conn->close();
?>
