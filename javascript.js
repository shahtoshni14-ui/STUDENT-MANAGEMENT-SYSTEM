let students = JSON.parse(localStorage.getItem("students")) || [];

let editIndex = -1;

// Add or Update Student
let today = new Date();

let dateAdded =
    today.getDate().toString().padStart(2, "0") + "/" +
    (today.getMonth() + 1).toString().padStart(2, "0") + "/" +
    today.getFullYear();

let student = {
    name: name,
    roll: roll,
    branch: branch,
    marks: marks,
    dateAdded: dateAdded
};

// Display Students
function displayStudents() {

    let tableBody = document.getElementById("tableBody");

    tableBody.innerHTML = "";

    students.forEach((student, index) => {

        let row = tableBody.insertRow();

        row.insertCell(0).innerHTML = student.name;
        row.insertCell(1).innerHTML = student.roll;
        row.insertCell(2).innerHTML = student.branch;
        row.insertCell(3).innerHTML = student.marks;
        row.insertCell(4).innerHTML =
            student.dateAdded || "N/A";

        let actionCell = row.insertCell(5);

        actionCell.innerHTML = `
            <button onclick="editStudent(${index})">
                Edit
            </button>

            <button onclick="deleteStudent(${index})">
                Delete
            </button>
        `;
    });

    updateStudentCount();
}

// Edit Student
function editStudent(index) {

    document.getElementById("name").value =
        students[index].name;

    document.getElementById("roll").value =
        students[index].roll;

    document.getElementById("branch").value =
        students[index].branch;

    document.getElementById("marks").value =
        students[index].marks;

    editIndex = index;

    document.getElementById("submitBtn").innerText =
        "Update Student";
}

// Delete Student
function deleteStudent(index) {

    if (!confirm("Are you sure you want to delete this student?")) {
        return;
    }

    students.splice(index, 1);

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

    displayStudents();
}

// Search Student
function searchStudent() {

    let input =
        document.getElementById("searchInput")
        .value
        .toLowerCase();

    let rows =
        document.querySelectorAll("#tableBody tr");

    rows.forEach(row => {

        let name =
            row.cells[0].innerText.toLowerCase();

        if (name.includes(input)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}

// Update Count
function updateStudentCount() {

    document.getElementById("studentCount").innerHTML =
        "Total Students: " + students.length;
}

// Clear Form
function clearForm() {

    document.getElementById("name").value = "";
    document.getElementById("roll").value = "";
    document.getElementById("branch").value = "";
    document.getElementById("marks").value = "";
}

// Clear All Data
function clearAllStudents() {

    if (!confirm("Delete all student records?")) {
        return;
    }

    students = [];

    localStorage.removeItem("students");

    displayStudents();
}

// Export CSV
function exportToCSV() {

    let csv =
        "Name,Roll No,Branch,Marks,Date Added\n";

    students.forEach(student => {

        csv +=
            student.name + "," +
            student.roll + "," +
            student.branch + "," +
            student.marks + "," +
            (student.dateAdded || "N/A") +
            "\n";
    });

    let blob =
        new Blob([csv], { type: "text/csv" });

    let link =
        document.createElement("a");

    link.href =
        URL.createObjectURL(blob);

    link.download =
        "students.csv";

    link.click();
}

// Load Data
displayStudents();