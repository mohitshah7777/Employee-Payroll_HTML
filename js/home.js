// UC-17
let empPayrollList;
window.addEventListener('DOMContentLoaded', (event) => {
    empPayrollList = getEmployeePayrollDataFromStorage();
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHTML();
    localStorage.removeItem('editEmp');
});

const createInnerHTML = () => {
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>startDate</th><th>Actions</th>";
    if(empPayrollList.length == 0) return;
    let innerHtml = `${headerHtml}`;
    // let empPayrollList = createEmployeePayrollJSON();
    for(const empPayrollData of empPayrollList) {
        innerHtml = `${innerHtml}
        <tr>
            <td>
                <img src="${empPayrollData._profilePic}" alt="" class="profile">
            </td>
            <td>${empPayrollData._name}</td>
            <td>${empPayrollData._gender}</td>
            <td>${getDeptHtml(empPayrollData._department)}</td>
            <td>${empPayrollData._salary}</td>
            <td>${empPayrollData._startDate}</td>
            <td>
                <img name="${empPayrollData._id}" onclick="remove(this)" src="../assets/icons/delete-black-18dp.svg" alt="delete">
                <img name="${empPayrollData._id}" onclick="update(this)" src="../assets/icons/create-black-18dp.svg" alt="edit">
            </td>
        </tr>`;
        }
    document.querySelector('#table-display').innerHTML = innerHtml;
}

// UC-18
const createEmployeePayrollJSON = () => {
    let empPayrollListLocal = [
        {
            _name: 'Mohit Shah',
            _gender: 'Male',
            _department: [
                'Engineernig',
                'Finance'
            ],
            _salary: '400000',
            _startDate: '2 Sep 2019',
            _note: '',
            _id: new Date().getTime(),
            _profilePic: '../assets/profile-images/Ellipse -5.png'
        },
        {
            _name: 'Darshan Patil',
            _gender: 'Male',
            _department: [
                'Engineernig'
            ],
            _salary: '350000',
            _startDate: '1 Nov 2019',
            _note: '',
            _id: new Date().getTime() + 1,
            _profilePic: '../assets/profile-images/Ellipse -2.png'
        }
    ];
    return empPayrollListLocal;
}

const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for(const dept of deptList){
        deptHtml = `${deptHtml} <div class='dept-label'>${dept}</div>`
    }
    return deptHtml;
}

//UC-19
const getEmployeePayrollDataFromStorage = () => {
    return localStorage.getItem('EmployeePayrollList') ? JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
}