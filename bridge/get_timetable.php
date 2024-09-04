<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// CORS headers
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json");

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

// Fetch data from timetable table
$sql = "SELECT * FROM timetable";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $timetableData = [];
    while ($row = $result->fetch_assoc()) {
        $timetableData[] = $row;
    }
    echo json_encode($timetableData);
} else {
    echo json_encode([]);
}

$conn->close();
?>
