function filterStudents(){

    const search =
        document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    const dept =
        document
        .getElementById("filterDept")
        .value;

    const status =
        document
        .getElementById("filterStatus")
        .value;

    const filtered = STUDENTS.filter(student => {

        const matchSearch =

            student.name
            .toLowerCase()
            .includes(search)

            ||

            student.id
            .toLowerCase()
            .includes(search)

            ||

            student.dept
            .toLowerCase()
            .includes(search);

        const matchDept =
            dept === ""
            ||
            student.dept === dept;

        const matchStatus =
            status === ""
            ||
            student.status === status;

        return (
            matchSearch
            &&
            matchDept
            &&
            matchStatus
        );

    });

    renderTable(filtered);
}