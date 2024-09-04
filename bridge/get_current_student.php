<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json");

// Simulate session or token-based authentication
session_start();

if (!isset($_SESSION['student_id'])) {
    echo json_encode(['success' => false, 'message' => 'Not authenticated']);
    exit;
}

$student_id = $_SESSION['student_id'];

// Database configuration
$host = 'localhost';
$dbname = 'E-Attendance';  // Replace with your database name
$username = 'root';  // Replace with your database username
$password = '';  // Replace with your database password

// Create connection
$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode([
        'success' => false,
        'message' => 'Database connection failed: ' . $conn->connect_error
    ]));
}

// Fetch current student data
$sql = "SELECT id, name FROM users WHERE id = '$student_id' AND role = 'student'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $student = $result->fetch_assoc();
    echo json_encode($student);
} else {
    echo json_encode(['success' => false, 'message' => 'Student not found']);
}

$conn->close();
?>
