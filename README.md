# employee-compensation-forecast
HR analytics case study using SQL + Power BI

#Tool and Technology Used**
**Database**: SQL (XAMPP Server)
**Programming Language**: PHP
**Frontend:** HTML, CSS, JavaScript
**Other:** PowerBi Dashboard

#Database Setup
Install any database server like XAMPP and import all the CSV files.
Normalize the files (if needed as CSV sometimes autoformats certain data like years of experience.)
Configure the database connection using the db_config file and php files for stored procedures 
Use the UI filters created using frontend languages to filter, analyse, and export data

# PowerBI Dashboard
![image](https://github.com/user-attachments/assets/adedf2d6-5eb3-432c-9999-366eeb4cfe45)
This is the screenshot of the dashboard, as GitHub doesn't allow sharing Power BI files. This was done by adding the exported JOIN file from the SQL database and then imported as csv in Power BI to create an interactive dashboard.

#User-Story
**User Story 1: Filter and Display Active Employees by Role
As a user, I should be able to:
Filter employees by Role
Select a Location and view the average compensation for that location
View a bar chart comparing compensation across all locations
Toggle to include/exclude Inactive employees
View: Employee Name, Role, Location, and Compensation**

For this user story, I have created the UI as well in a Power BI dashboard, which allows one to filter data and view a bar graph according to that. The data is fetched from the stored procedure and the JS and php connectivity with the HTML code.

**User Story 2: Group Employees by Years of Experience
As a user, I should be able to:
View a count of employees in experience ranges (e.g., 0–1, 1–2, 2–5, etc.)
Optionally group breakdown by Location or Role**

For this user story, I have added the employees count in UI and the Power BI Dashboard, which helps to know the  number of employees filtered by the years of experience.

**User Story 3: Simulate Compensation Increments
As a user, I should be able to:
Input a global fixed % increment
See updated compensation alongside the current compensation
Bonus: Apply custom % increments per Employee or per Location**

I have added a global increment button in the UI whose function is added in the JS and slicer in Power BI, which allows you to see the increased compensation.

**User Story 4: Download Filtered Employee Data
As a user, I should be able to:
Export filtered employee data to a CSV file
CSV should include: Name, Role, Location, Experience, Compensation, Status
Reflect any applied incremented values**

One can download the updated CSV file from the UI, showing the updated data according to the chosen filter. 

All the data is fetched from the database, no manual entry is done.
