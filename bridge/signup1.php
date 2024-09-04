<?php
// Allow CORS
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Handle preflight request
    http_response_code(200);
    exit;
}

include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = isset($_POST['username']) ? $conn->real_escape_string($_POST['username']) : '';
    $password = isset($_POST['password']) ? $_POST['password'] : '';

    if (empty($username) || empty($password)) {
        echo json_encode(["error" => "Username and password are required"]);
        http_response_code(400); // Bad Request
        exit;
    }

    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
    $token = bin2hex(random_bytes(16)); // Generate a random token

    $sql = "INSERT INTO users (username, password, token) VALUES ('$username', '$hashedPassword', '$token')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "User registered successfully"]);
    } else {
        echo json_encode(["error" => "Error: " . $sql . "<br>" . $conn->error]);
        http_response_code(500); // Internal Server Error
    }

    $conn->close();
} else {
    echo json_encode(["error" => "Invalid request method"]);
    http_response_code(405); // Method Not Allowed
}
?>
