<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Allow CORS
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// fetch_attendance.php

// Configuration
$dbHost = 'localhost';
$dbUsername = 'root';
$dbPassword = '';
$dbName = 'E-Attendance';


// Connect to database
$conn = new mysqli($dbHost, $dbUsername, $dbPassword, $dbName);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch attendance data
$query = "SELECT * FROM attendance";
$result = $conn->query($query);

$attendanceRecords = array();
while($row = $result->fetch_assoc()) {
    $attendanceRecords[] = $row;
}

echo json_encode($attendanceRecords);

$conn->close();
?>
