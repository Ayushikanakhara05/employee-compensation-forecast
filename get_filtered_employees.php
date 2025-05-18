<?php
header('Content-Type: application/json; charset=utf-8');
include("db_config.php"); // your DB config

$role = isset($_GET['role']) && $_GET['role'] !== '' ? $_GET['role'] : null;
$location = isset($_GET['location']) && $_GET['location'] !== '' ? $_GET['location'] : null;

$stmt = $conn->prepare("CALL GetFilteredCompGap(?, ?)");
$stmt->bind_param("ss", $role, $location);
$stmt->execute();
$result = $stmt->get_result();

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data, JSON_UNESCAPED_UNICODE);
$conn->close();
?>
