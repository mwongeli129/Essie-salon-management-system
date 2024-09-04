<?php
// mark_attendance.php

// Configuration
$dbHost = 'localhost';
$dbUsername = 'root';
$dbPassword = '';
$dbName = 'E-Attendance';

// CORS policy
header('Access-Control-Allow-Origin: http://localhost:3000'); // Update with your React app URL
header('Access-Control-Allow-Methods: POST, OPTIONS'); // Add OPTIONS method for preflight requests
header('Access-Control-Allow-Headers: Content-Type, Authorization'); // Include Authorization header

// Connect to database
$conn = new mysqli($dbHost, $dbUsername, $dbPassword, $dbName);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Get the attendance data from the request
$attendanceData = json_decode(file_get_contents('php://input'), true);

// Retrieve necessary data from frontend
$sessionId = $attendanceData['session_id'];
$attendanceDate = isset($attendanceData['attendance_date']) ? $attendanceData['attendance_date'] : date('Y-m-d H:i:s');
$username = isset($attendanceData['username']) ? $attendanceData['username'] : '';

// Ensure attendanceDate is in proper format
$attendanceDate = date('Y-m-d H:i:s', strtotime($attendanceDate));

// Validate session ID
$query = "SELECT subject FROM timetable WHERE id = '$sessionId'";
$result = $conn->query($query);
if ($result->num_rows == 0) {
    echo json_encode(['success' => false, 'message' => 'Invalid session ID']);
    exit;
}
$subject = $result->fetch_assoc()['subject'];

// Get student ID based on username
$query = "SELECT id, name FROM users WHERE username = '$username'";
$result = $conn->query($query);
if ($result->num_rows == 0) {
    echo json_encode(['success' => false, 'message' => 'Student not found']);
    exit;
}
$student = $result->fetch_assoc();
$studentId = $student['id'];
$studentName = $student['name'];

// Check if attendance already marked for this student and session
$query = "SELECT * FROM attendance WHERE student_id = '$studentId' AND session_id = '$sessionId'";
$result = $conn->query($query);
if ($result->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => 'Attendance already marked for this session']);
    exit;
}

// Mark attendance
$insertQuery = "INSERT INTO attendance (student_id, session_id, attendance_date, student_name, subject) VALUES ('$studentId', '$sessionId', '$attendanceDate', '$studentName', '$subject')";
if ($conn->query($insertQuery) === TRUE) {
    echo json_encode(['success' => true, 'message' => 'Attendance marked successfully']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error marking attendance: ' . $conn->error]);
}

$conn->close();
?>
