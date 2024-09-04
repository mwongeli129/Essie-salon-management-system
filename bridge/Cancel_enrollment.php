<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *"); // Adjust this to your frontend origin if needed
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight requests (OPTIONS method)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit();
}

// Database connection parameters
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "E-Attendance";

// Create a connection to the database
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    http_response_code(500); // Internal Server Error
    echo json_encode(["error" => "Database connection failed: " . $conn->connect_error]);
    exit();
}

// Get the enrollment ID from the request
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $url = parse_url($_SERVER['REQUEST_URI']);
    parse_str($url['query'], $queryParams);
    $enrollmentId = isset($queryParams['id']) ? intval($queryParams['id']) : 0;

    if ($enrollmentId <= 0) {
        http_response_code(400); // Bad Request
        echo json_encode(["error" => "Invalid enrollment ID"]);
        exit();
    }

    // Prepare and execute the DELETE query
    $stmt = $conn->prepare("DELETE FROM enrollments WHERE id = ?");
    $stmt->bind_param("i", $enrollmentId);

    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            // Successfully deleted
            http_response_code(200); // OK
            echo json_encode(["message" => "Enrollment canceled successfully"]);
        } else {
            // No rows affected (enrollment not found)
            http_response_code(404); // Not Found
            echo json_encode(["error" => "Enrollment not found"]);
        }
    } else {
        // Query failed
        http_response_code(500); // Internal Server Error
        echo json_encode(["error" => "Error executing query: " . $stmt->error]);
    }

    $stmt->close();
} else {
    // Method not allowed
    http_response_code(405); // Method Not Allowed
    echo json_encode(["error" => "Invalid request method"]);
}

$conn->close();
?>
