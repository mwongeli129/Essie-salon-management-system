<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Allow requests from specific origin
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Include database connection
require_once 'DbConnect.php';

// Import JWT class
require_once 'vendor/autoload.php';
use \Firebase\JWT\JWT;

// Create an instance of DbConnect to establish the connection
$dbConnect = new DbConnect();
$conn = $dbConnect->conn;

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve username and password from POST request
    $data = json_decode(file_get_contents("php://input"), true); // For JSON data
    $username = isset($data['username']) ? $data['username'] : '';
    $password = isset($data['password']) ? $data['password'] : '';

    if (!empty($username) && !empty($password)) {
        // Query to check if the user exists and fetch role
        $stmt = $conn->prepare("SELECT id, username, password, role FROM users WHERE username = :username");
        $stmt->bindParam(':username', $username);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            // Retrieve hashed password from the database
            $storedHashedPassword = $user['password'];

            // Verify password
            if (password_verify($password, $storedHashedPassword)) {
                // Password is correct, login successful
                $role = $user['role'];

                // Generate a token
                $key = '92c0ce9e7227beb6e19f5ac95367e17403aaecb7c694b154c38877b8d0297563'; // Replace with your actual secret key
                $algorithm = 'HS256'; // Algorithm to use for encoding

                $payload = array(
                    'username' => $username,
                    'role' => $role
                );

                $token = JWT::encode($payload, $key, $algorithm);

                // Update token in the database (optional, if you need to store tokens)
                // $updateToken = "UPDATE users SET token = '$token' WHERE id = " . $user['id'];
                // $conn->query($updateToken);

                // Send success response with token
                $response = array("success" => true, "role" => $role, "token" => $token);
                echo json_encode($response);
            } else {
                // Password is incorrect, send error response
                $response = array("success" => false, "error" => "Invalid password");
                http_response_code(401); // Unauthorized
                echo json_encode($response);
            }
        } else {
            // User not found, send error response
            $response = array("success" => false, "error" => "User not found");
            http_response_code(404); // Not Found
            echo json_encode($response);
        }
    } else {
        // Required data not provided, send error response
        $response = array("success" => false, "error" => "Username and password are required");
        http_response_code(400); // Bad request
        echo json_encode($response);
    }
}

// Close database connection
$conn = null;
?>