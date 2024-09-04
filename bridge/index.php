<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Allow CORS
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once 'DbConnect.php';
$dbConnect = new DbConnect();
$conn = $dbConnect->conn;

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "OPTIONS":
        // Respond to preflight requests
        http_response_code(200);
        break;

    case "GET":
        $sql = "SELECT id, name, email, username, role, phonenumber, signin_date FROM users";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($users);
        break;

    case "POST":
        // Fetch data from JSON input
        $data = json_decode(file_get_contents("php://input"), true);

        // Validate and sanitize input
        $username = isset($data['username']) ? htmlspecialchars($data['username']) : '';
        $password = isset($data['password']) ? htmlspecialchars($data['password']) : '';
        $name = isset($data['name']) ? htmlspecialchars($data['name']) : '';
        $email = isset($data['email']) ? htmlspecialchars($data['email']) : '';
        $role = isset($data['role']) ? htmlspecialchars($data['role']) : '';
        $phonenumber = isset($data['phonenumber']) ? htmlspecialchars($data['phonenumber']) : '';

        if (empty($username) || empty($password) || empty($name) || empty($email) || empty($role) || empty($phonenumber)) {
            echo json_encode(["error" => "All fields are required"]);
            http_response_code(400); // Bad Request
            exit;
        }

        // Hash the password
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
        $token = bin2hex(random_bytes(16)); // Generate a random token

        // Prepare SQL statement with parameters
        $sql = "INSERT INTO users (username, password, name, email, role, phonenumber, token) 
                VALUES (:username, :password, :name, :email, :role, :phonenumber, :token)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':password', $hashedPassword);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':role', $role);
        $stmt->bindParam(':phonenumber', $phonenumber);
        $stmt->bindParam(':token', $token);

        // Execute the statement
        if ($stmt->execute()) {
            echo json_encode(["message" => "User registered successfully"]);
        } else {
            echo json_encode(["error" => "Error: " . $sql . "<br>" . $conn->error]);
            http_response_code(500); // Internal Server Error
        }

        break;

    default:
        echo json_encode(["error" => "Invalid request method"]);
        http_response_code(405); // Method Not Allowed
        break;
}

// Close the database connection (optional)
// $conn = null;
?>
