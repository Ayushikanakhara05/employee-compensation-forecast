// GetEmployeeCompensationGap
DELIMITER //

CREATE PROCEDURE GetEmployeeCompensationGap()
BEGIN
    SELECT 
        ed.emp_id,
        ed.name,
        ed.role,
        ed.location,
        ed.years_of_experience,
        ed.current_compensation,
        COALESCE(er.self_rating, 0) AS self_rating,
        COALESCE(er.manager_rating, 0) AS manager_rating,
        COALESCE(ic.average_industry_compensation, 0) AS average_industry_compensation,
        (ed.current_compensation - COALESCE(ic.average_industry_compensation, 0)) AS compensation_gap,
        ed.is_active
    FROM employees_data ed
    LEFT JOIN employee_rating er ON ed.emp_id = er.emp_id
    LEFT JOIN industry_compensation ic ON ed.role = ic.role AND ed.location = ic.location
    ORDER BY ed.emp_id ASC;
END //

DELIMITER ;
