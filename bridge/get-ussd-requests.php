<?php
// get-ussd-requests.php
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "DbConnect.php";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM ussd_requests";
$result = $conn->query($sql);

$requests = array();
while ($row = $result->fetch_assoc()) {
    $requests[] = $row;
}

echo json_encode($requests);

$conn->close();
?>
