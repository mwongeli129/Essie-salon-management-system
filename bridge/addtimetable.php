<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// CORS headers
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
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

// Get the posted data
$data = json_decode(file_get_contents('php://input'), true);

$subject = $data['subject'];
$day = $data['day'];
$start_time = $data['start_time'];
$end_time = $data['end_time'];
$instructor = $data['instructor'];

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO timetable (subject, day, start_time, end_time, instructor) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $subject, $day, $start_time, $end_time, $instructor);

if ($stmt->execute()) {
    echo json_encode([
        'success' => true,
        'message' => 'Timetable entry added successfully'
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Error adding timetable entry: ' . $stmt->error
    ]);
}

$stmt->close();
$conn->close();
?>
