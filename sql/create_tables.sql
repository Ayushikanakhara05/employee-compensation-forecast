CREATE TABLE employee_data (
    name VARCHAR(100),
    role VARCHAR(100),
    location VARCHAR(50),
    years_of_experience VARCHAR(10),
    is_active CHAR(1),
    current_compensation INT,
    last_working_day DATE
);

CREATE TABLE employee_rating (
    name VARCHAR(100),
    role VARCHAR(100),
    location VARCHAR(50),
    years_of_experience VARCHAR(10),
    self_rating INT,
    manager_rating INT
);

CREATE TABLE industry_compensation (
    location VARCHAR(50),
    role VARCHAR(100),
    average_industry_compensation INT
);
