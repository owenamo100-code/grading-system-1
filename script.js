const students = [];

const studentForm = document.getElementById("studentForm");
const studentName = document.getElementById("studentName");
const studentScore = document.getElementById("studentScore");
const studentList = document.getElementById("studentList");
const results = document.getElementById("results");
const message = document.getElementById("message");

// Assign a grade based on the score
function getGrade(score) {
    if (score >= 80) return "A";
    if (score >= 70) return "B";
    if (score >= 60) return "C";
    if (score >= 50) return "D";
    return "F";
}

// Display messages
function showMessage(text) {
    message.textContent = text;
}

// Display all students
function displayStudents() {
    studentList.innerHTML = "";

    students.forEach((student, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td></td>
            <td>${student.score}</td>
            <td><button type="button" data-index="${index}">Remove</button></td>
        `;

        // Use textContent for student-entered text
        row.children[1].textContent = student.name;

        studentList.appendChild(row);
    });
}

// Add a student
studentForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = studentName.value.trim();
    const score = Number(studentScore.value);

    if (name === "") {
        showMessage("Please enter the student's name.");
        return;
    }

    if (
        studentScore.value.trim() === "" ||
        !Number.isFinite(score) ||
        score < 0 ||
        score > 100
    ) {
        showMessage("Enter a score between 0 and 100.");
        return;
    }

    students.push({ name: name, score: score });

    displayStudents();
    studentForm.reset();
    showMessage("Student added successfully!");
});

// Remove a student
studentList.addEventListener("click", function (event) {
    if (event.target.tagName === "BUTTON") {
        const index = Number(event.target.dataset.index);

        students.splice(index, 1);
        displayStudents();
        results.innerHTML = "";
        showMessage("Student removed.");
    }
});

// Calculate results
document.getElementById("calculateButton").addEventListener("click", function () {
    if (students.length === 0) {
        showMessage("Please add at least one student first.");
        return;
    }

    let total = 0;
    let highestStudent = students[0];

    students.forEach(student => {
        total += student.score;

        if (student.score > highestStudent.score) {
            highestStudent = student;
        }
    });

    const average = total / students.length;

    let output = `
        <h2>Grading Results</h2>
        <p><strong>Total students:</strong> ${students.length}</p>
        <p><strong>Class average:</strong> ${average.toFixed(2)}</p>
        <p><strong>Highest score:</strong> ${highestStudent.name}
        (${highestStudent.score})</p>
        <table>
            <thead>
                <tr><th>Name</th><th>Score</th><th>Grade</th></tr>
            </thead>
            <tbody>
    `;

    students.forEach(student => {
        output += `
            <tr>
                <td></td>
                <td>${student.score}</td>
                <td>${getGrade(student.score)}</td>
            </tr>
        `;
    });

    results.innerHTML = output + "</tbody></table>";

    // Safely display names in the result table
    const nameCells = results.querySelectorAll("tbody tr td:first-child");
    students.forEach((student, index) => {
        nameCells[index].textContent = student.name;
    });

    showMessage("Results calculated successfully!");
});

// Reset everything
document.getElementById("resetButton").addEventListener("click", function () {
    students.length = 0;
    studentForm.reset();
    displayStudents();
    results.innerHTML = "";
    showMessage("All records cleared.");
});