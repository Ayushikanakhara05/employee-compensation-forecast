<?php
header('Content-Type: text/csv; charset=utf-8');
header('Content-Disposition: attachment; filename=employee_compensation_export.csv');

include("db_config.php");

$sql = "
SELECT 
    ed.emp_id,
    ed.name,
    ed.role,
    ed.location,
    ed.years_of_experience,
    ed.current_compensation,
    ed.is_active,
    COALESCE(er.self_rating, 0) AS self_rating,
    COALESCE(er.manager_rating, 0) AS manager_rating,
    COALESCE(ic.average_industry_compensation, 0) AS average_industry_compensation,
    (ed.current_compensation - COALESCE(ic.average_industry_compensation, 0)) AS compensation_gap
FROM employees_data ed
LEFT JOIN employee_rating er ON ed.emp_id = er.emp_id
LEFT JOIN industry_compensation ic ON ed.role = ic.role AND ed.location = ic.location
ORDER BY ed.emp_id ASC
";

$result = $conn->query($sql);

if (!$result) {
    die("SQL error: " . $conn->error);
}

if ($result->num_rows == 0) {
    die("No data found.");
}

$output = fopen('php://output', 'w');

// Add column headers including is_active
fputcsv($output, [
    'Employee ID', 'Name', 'Role', 'Location', 'Experience (Years)', 
    'Current Compensation', 'Active Status', 'Self Rating', 'Manager Rating', 
    'Industry Avg Compensation', 'Compensation Gap'
]);

while ($row = $result->fetch_assoc()) {
    fputcsv($output, [
        $row['emp_id'],
        $row['name'],
        $row['role'],
        $row['location'],
        $row['years_of_experience'],
        $row['current_compensation'],
        $row['is_active'],
        $row['self_rating'],
        $row['manager_rating'],
        $row['average_industry_compensation'],
        $row['compensation_gap']
    ]);
}

fclose($output);
$conn->close();
exit;
?>
