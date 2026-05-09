const STUDENTS = [
    { id:"STU-001", name:"Mohamed Ahmed", dept:"Computer Science", year:3, gpa:3.8, status:"Active" },
    { id:"STU-002", name:"Fatma Ali", dept:"Information Systems", year:2, gpa:3.5, status:"Active" },
    { id:"STU-003", name:"Omar Khaled", dept:"Software Engineering", year:4, gpa:2.9, status:"Active" },
    { id:"STU-004", name:"Sara Yousef", dept:"Artificial Intelligence", year:1, gpa:3.9, status:"Active" },
    { id:"STU-005", name:"Ahmed Reda", dept:"Computer Science", year:3, gpa:3.2, status:"Active" },
    { id:"STU-006", name:"Nour Sami", dept:"Information Systems", year:2, gpa:2.6, status:"Inactive" },
    { id:"STU-007", name:"Karim Abdullah", dept:"Software Engineering", year:4, gpa:3.7, status:"Active" },
    { id:"STU-008", name:"Mona Hussein", dept:"Artificial Intelligence", year:3, gpa:3.1, status:"Active" },
    { id:"STU-009", name:"Yousef Tarek", dept:"Computer Science", year:1, gpa:3.4, status:"Active" },
    { id:"STU-010", name:"Reem Ashraf", dept:"Information Systems", year:4, gpa:3.6, status:"Graduated" }
];

let editIndex = null;

function updateCount() {
    document.getElementById("studentsCount").innerHTML =
        `Total Students: ${STUDENTS.length}`;
}

function getGrade(gpa) {
    if (gpa >= 3.7) return { label: "A", cls: "grade-a" };
    if (gpa >= 3.0) return { label: "B", cls: "grade-b" };
    if (gpa >= 2.3) return { label: "C", cls: "grade-c" };
    return { label: "D", cls: "grade-d" };
}

function statusBadge(status) {
    if (status === "Active")   return `<span class="badge badge-active">${status}</span>`;
    if (status === "Inactive") return `<span class="badge badge-inactive">${status}</span>`;
    return `<span class="badge badge-grad">${status}</span>`;
}

function renderTable(data) {
    const tbody = document.getElementById("studentsTable");
    tbody.innerHTML = data.map((student, index) => {
        const grade = getGrade(student.gpa);
        const realIndex = STUDENTS.indexOf(student);
        return `
        <tr>
            <td>${index + 1}</td>
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.dept}</td>
            <td>Year ${student.year}</td>
            <td>${student.gpa.toFixed(1)}</td>
            <td class="${grade.cls}">${grade.label}</td>
            <td>${statusBadge(student.status)}</td>
            <td>
                <button class="btn-edit" onclick="openEditModal(${realIndex})">Edit</button>
                <button class="btn-delete" onclick="deleteStudent(${realIndex})">Delete</button>
            </td>
        </tr>`;
    }).join("");
    updateCount();
}

// ── Add ──
function openModal() {
    document.getElementById("modalOverlay").classList.add("open");
}

function closeModal() {
    document.getElementById("modalOverlay").classList.remove("open");
    document.getElementById("addName").value = "";
    document.getElementById("addId").value = "";
    document.getElementById("addDept").value = "";
    document.getElementById("addYear").value = "";
    document.getElementById("addGpa").value = "";
    document.getElementById("addStatus").value = "Active";
}

function addStudent() {
    const name   = document.getElementById("addName").value.trim();
    const id     = document.getElementById("addId").value.trim();
    const dept   = document.getElementById("addDept").value;
    const year   = parseInt(document.getElementById("addYear").value);
    const gpa    = parseFloat(document.getElementById("addGpa").value);
    const status = document.getElementById("addStatus").value;

    if (!name || !id || !dept || !year || isNaN(gpa)) {
        alert("Please fill all fields.");
        return;
    }

    STUDENTS.push({ id, name, dept, year, gpa, status });
    closeModal();
    renderTable(STUDENTS);
}

// ── Edit ──
function openEditModal(index) {
    editIndex = index;
    const s = STUDENTS[index];
    document.getElementById("editName").value   = s.name;
    document.getElementById("editDept").value   = s.dept;
    document.getElementById("editYear").value   = s.year;
    document.getElementById("editGpa").value    = s.gpa;
    document.getElementById("editStatus").value = s.status;
    document.getElementById("editModalOverlay").classList.add("open");
}

function closeEditModal() {
    document.getElementById("editModalOverlay").classList.remove("open");
    editIndex = null;
}

function saveEdit() {
    if (editIndex === null) return;
    STUDENTS[editIndex].name   = document.getElementById("editName").value.trim();
    STUDENTS[editIndex].dept   = document.getElementById("editDept").value;
    STUDENTS[editIndex].year   = parseInt(document.getElementById("editYear").value);
    STUDENTS[editIndex].gpa    = parseFloat(document.getElementById("editGpa").value);
    STUDENTS[editIndex].status = document.getElementById("editStatus").value;
    closeEditModal();
    renderTable(STUDENTS);
}

// ── Delete ──
function deleteStudent(index) {
    if (!confirm(`Delete ${STUDENTS[index].name}?`)) return;
    STUDENTS.splice(index, 1);
    renderTable(STUDENTS);
}

renderTable(STUDENTS);