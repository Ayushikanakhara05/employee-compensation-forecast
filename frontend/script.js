document.addEventListener("DOMContentLoaded", () => {
    loadFilters();
    applyFilters();
});

function loadFilters() {
    fetch("get_filtered_employees.php")
        .then(res => res.json())
        .then(data => {
            const roles = [...new Set(data.map(e => e.role))];
            const locations = [...new Set(data.map(e => e.location))];

            const roleSelect = document.getElementById("roleFilter");
            const locSelect = document.getElementById("locationFilter");

            roleSelect.innerHTML = "<option value=''>All Roles</option>";
            locSelect.innerHTML = "<option value=''>All Locations</option>";

            roles.forEach(role => roleSelect.innerHTML += `<option value="${role}">${role}</option>`);
            locations.forEach(loc => locSelect.innerHTML += `<option value="${loc}">${loc}</option>`);
        });
}

function applyFilters() {
    const role = document.getElementById("roleFilter").value;
    const location = document.getElementById("locationFilter").value;
    const showInactive = document.getElementById("showInactive").checked;

    let url = `get_filtered_employees.php?role=${encodeURIComponent(role)}&location=${encodeURIComponent(location)}`;

   fetch(url)
    .then(res => res.json())
    .then(data => {
         currentEmployeesData = data;  // Save data globally
        const container = document.getElementById("employeeList");
        container.innerHTML = "";

        data.forEach(emp => {
            if (!showInactive && emp.is_active !== "Y") return;

            const div = document.createElement("div");
            div.className = "employee-entry"; // add class for future targeting
            div.dataset.empId = emp.emp_id;
           div.innerHTML = `
    <strong>${emp.name}</strong> — ${emp.role}, ${emp.location}<br>
    Experience: ${emp.years_of_experience} yrs<br>
    Status: ${emp.is_active === "Y" ? "Active" : "Inactive"}<br>
    Compensation: ₹<span class="compensation">${emp.current_compensation}</span><br>
    Incremented Compensation: ₹<span class="incremented-compensation">${emp.current_compensation}</span><br>
    Gap: ₹${emp.compensation_gap}<hr>
`;
            container.appendChild(div);
        });

        groupByExperience(data);  // Add this line
        renderExperienceChart(data);

    });
}

function simulateIncrement() {
    const incrementInput = document.getElementById("incrementValue");
    const incrementPercent = parseFloat(incrementInput.value);

    if (isNaN(incrementPercent)) {
        alert("Please enter a valid number for increment.");
        return;
    }

    const incrementedSpans = document.querySelectorAll(".employee-entry .incremented-compensation");

    currentEmployeesData.forEach((emp, index) => {
        const newComp = emp.current_compensation * (1 + incrementPercent / 100);
        incrementedSpans[index].textContent = newComp.toFixed(2);
    });
}


function groupByExperience(employees) {
    const groups = {
        '0-1': 0,
        '1-2': 0,
        '2-5': 0,
        '5+': 0,
    };

    employees.forEach(emp => {
        const exp = parseFloat(emp.years_of_experience);
        if (exp >= 0 && exp <= 1) groups['0-1']++;
        else if (exp > 1 && exp <= 2) groups['1-2']++;
        else if (exp > 2 && exp <= 5) groups['2-5']++;
        else if (exp > 5) groups['5+']++;
    });

    // Render the grouping
    const container = document.getElementById('experienceGrouping');
    container.innerHTML = '';

    for (const range in groups) {
        const div = document.createElement('div');
        div.textContent = `${range} years: ${groups[range]} employee(s)`;
        container.appendChild(div);
    }
}

let currentEmployeesData = [];  // stores the latest fetched employee data


function downloadCSV() {
    const data = [];
    const rows = document.querySelectorAll("#employeeList div");

    rows.forEach(row => {
        const text = row.innerText.split('\n').join(' | ');
        data.push(text);
    });

    const csvContent = "\uFEFF" + data.join("\n"); // prepend BOM
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "filtered_employees.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


function renderLocationChart(data) {
    const locationMap = {};
    data.forEach(emp => {
        if (!locationMap[emp.location]) locationMap[emp.location] = [];
        locationMap[emp.location].push(parseFloat(emp.current_compensation));
    });

    const labels = Object.keys(locationMap);
    const avgData = labels.map(loc =>
        (locationMap[loc].reduce((a, b) => a + b, 0) / locationMap[loc].length).toFixed(2)
    );

    const ctx = document.getElementById("locationChart").getContext("2d");
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Average Compensation",
                data: avgData,
                backgroundColor: "rgba(54, 162, 235, 0.6)"
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function renderExperienceChart(data) {
    const ranges = {
        "0-1": 0,
        "1-2": 0,
        "2-5": 0,
        "5+": 0
    };

    data.forEach(emp => {
        const exp = parseFloat(emp.years_of_experience);
        if (exp < 1) ranges["0-1"]++;
        else if (exp < 2) ranges["1-2"]++;
        else if (exp < 5) ranges["2-5"]++;
        else ranges["5+"]++;
    });

    const ctx = document.getElementById("experienceChart").getContext("2d");
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: Object.keys(ranges),
            datasets: [{
                label: "Employees",
                data: Object.values(ranges),
                backgroundColor: "rgba(255, 99, 132, 0.6)"
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

