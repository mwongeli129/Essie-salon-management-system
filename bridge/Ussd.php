<?php
require 'vendor/autoload.php'; // Ensure the path to the autoload file is correct

use AfricasTalking\SDK\AfricasTalking;

// Allow from any origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}

// Your Africa's Talking API credentials
$username = 'Sandbox';
$apiKey = 'atsk_6c2806b682a9ad7cb7fbc397f1f8931c5d91404fcca5c97c21f079511601dd0b24d41376';

// Initialize the SDK
$AT = new AfricasTalking($username, $apiKey);

// Respond to POST requests
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $sessionId = $_POST["sessionId"];
    $serviceCode = $_POST["serviceCode"];
    $phoneNumber = $_POST["phoneNumber"];
    $text = $_POST["text"];

    // Process the text and create a response
    $response = "";

    if ($text == "") {
        // This is the first request. Note how we start the response with CON
        $response = "CON Welcome to the e-attendance system \n";
        $response .= "1. Mark Attendance \n";
    } else if ($text == "1") {
        // Mark attendance
        $studentId = ""; // Get student ID based on the USSD session
        // Assuming you retrieve student ID from user input or session data

        // Save attendance to the database
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "E-Attendance";

        // Create connection
        $conn = new mysqli($servername, $username, $password, $dbname);

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        // Prepare SQL statement to insert attendance record
        $sql = "INSERT INTO attendance (student_id, session_id) VALUES (?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ss", $studentId, $sessionId);

        // Execute prepared statement
        if ($stmt->execute()) {
            $response = "END Attendance marked successfully.";
        } else {
            $response = "END Failed to mark attendance. Please try again.";
        }

        $stmt->close();
        $conn->close();
    } else {
        // Handle other cases or responses here
        $response = "END Invalid input. Please try again.";
    }

    header('Content-type: text/plain');
    echo $response;
}
