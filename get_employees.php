<?php
header('Content-Type: application/json; charset=utf-8');
include("db_config.php");

$sql = "CALL GetEmployeeCompensationGap()";
$result = $conn->query($sql);

$data = [];
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}
echo json_encode($data);
$conn->close();
?>
