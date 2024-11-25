'use strict';
const stdSubjectMarks = [
    {
        name: "sameer",
        subject: "maths",
        marks: 87
    },
    {
        name: "rahul",
        subject: "social science",
        marks: 88
    },
    {
        name: "mohan",
        subject: "science",
        marks: 98
    }
];

let editIndex = null;

function showData() {
    tbody.innerHTML = ``;
    stdSubjectMarks.forEach((item, index) => {
        tbody.innerHTML += `
            <tr>
                <td class="d-flex gap-2">
                    <p class="rounded-circle m-0 py-1 px-2 text-white bg-info">${item.name[0].toUpperCase()}</p>
                    <p class="m-0">${item.name.toUpperCase()}</p>
                </td>
                <td class="">${item.subject.toUpperCase()}</td>
                <td class="text-center">${item.marks}</td>
                <td class="d-flex gap-2 justify-content-center">
                    <button onclick="deleteData(${index})" class="bg-danger text-white px-2 rounded">Delete</button>
                    <button onclick="editData(${index})" class="bg-dark text-white px-2 rounded">Edit</button>
                </td>
            </tr>
        `;
    });
}
showData();

function addDataPopupShow() {
    const viewDash = document.querySelector(".working-dashboard");
    const divTag = document.createElement("div");
    divTag.innerHTML = `<div class="addDataPopup">
            <div class="position-relative">
                <figure class="hide-popup">
                    <img src="cross-icon.png" alt="cross-icon" width="100%">
                </figure>
            </div>
            <form action="#!" method="post">
                <div class="form-group mb-3">
                    <label for="stdName">Name</label>
                    <input type="text" id="stdName" class="form-control" required>
                </div>

                <div class="form-group mb-3">
                    <label for="stdSub">Subject</label>
                    <input type="text" id="stdSub" class="form-control" required>
                </div>

                <div class="form-group mb-3">
                    <label for="marks">Marks</label>
                    <input type="text" id="marks" class="form-control" required>
                </div>

                <div class="form-group text-center mt-4">
                    <input type="submit" value="Save" class="py-2 px-5 bg-dark text-white addData-btn">
                </div>
            </form>
        </div>`;
    viewDash.insertBefore(divTag, viewDash.firstElementChild);

    document.querySelector(".addDataPopup form").addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById("stdName").value.toLowerCase();
        const subject = document.getElementById("stdSub").value.toLowerCase();
        const marks = Number(document.getElementById("marks").value);

        if (editIndex !== null) {
            // Update existing record
            stdSubjectMarks[editIndex] = { name, subject, marks };
            editIndex = null; // Reset edit index
        } else {
            // Check if student with the same name and subject already exists
            const existingStudent = stdSubjectMarks.find(item => item.name === name && item.subject === subject);

            if (existingStudent) {
                // Update existing student marks
                existingStudent.marks += marks;
            } else {
                // Add new student if no match is found
                const newStudent = { name, subject, marks };
                stdSubjectMarks.push(newStudent);
            }
        }

        showData();
        
        // Clear input fields
        document.getElementById("stdName").value = "";
        document.getElementById("stdSub").value = "";
        document.getElementById("marks").value = "";
        
        // Hide popup after submission
        document.querySelector(".addDataPopup").remove();
    });

    // Hide addData popup
    document.querySelector(".hide-popup").addEventListener('click', () => {
        document.querySelector(".addDataPopup").classList.add("hide");
        editIndex = null; // Reset edit index when popup is closed
    });
}

document.getElementById("addItem").addEventListener('click', () => {
    editIndex = null; // Ensure that addDataPopupShow is not in edit mode
    addDataPopupShow();
});

function deleteData(index) {
    stdSubjectMarks.splice(index, 1);
    showData();
}

function editData(index) {
    editIndex = index;
    const studentObj = stdSubjectMarks[index];

    // Show the popup and pre-fill the form with existing data
    addDataPopupShow();
    document.getElementById("stdName").value = studentObj.name;
    document.getElementById("stdSub").value = studentObj.subject;
    document.getElementById("marks").value = studentObj.marks;
}
