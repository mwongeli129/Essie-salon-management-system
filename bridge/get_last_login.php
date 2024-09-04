<?php
// get_last_login.php

// Configuration
$dbHost = 'localhost';
$dbUsername = 'root';
$dbPassword = '';
$dbName = 'E-Attendance';

// CORS policy
// CORS policy
header('Access-Control-Allow-Origin: http://localhost:3000'); // Adjust as per your frontend origin
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Authorization, Content-Type');


// Check if it's a preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Connect to database
$conn = new mysqli($dbHost, $dbUsername, $dbPassword, $dbName);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get token from headers
// Check if Authorization header exists
$token = isset($_SERVER['HTTP_AUTHORIZATION']) ? $_SERVER['HTTP_AUTHORIZATION'] : '';

if (!$token) {
    echo json_encode(['error' => 'No token provided']);
    exit;
}

// Proceed with token validation and decoding


// Decode the token to extract user ID (assuming token format is JWT or similar)
$tokenParts = explode(' ', $token);
if (count($tokenParts) != 2 || $tokenParts[0] !== 'Bearer') {
    echo json_encode(['error' => 'Invalid token']);
    exit;
}

$jwt = $tokenParts[1];
$jwtParts = explode('.', $jwt);
if (count($jwtParts) != 3) {
    echo json_encode(['error' => 'Invalid token']);
    exit;
}

$payloadBase64 = $jwtParts[1];
$payload = json_decode(base64_decode($payloadBase64), true);
if (!$payload || !isset($payload['user_id'])) {
    echo json_encode(['error' => 'Invalid token payload']);
    exit;
}

$userId = $payload['user_id'];

// Query to get last login data
$query = "SELECT last_login, role FROM users WHERE id = '$userId'";
$result = $conn->query($query);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $lastLoginData = [
        'last_login' => $row['last_login'],
        'role' => $row['role'],
    ];

    echo json_encode($lastLoginData);
} else {
    echo json_encode(['error' => 'User not found']);
}

$conn->close();
?>