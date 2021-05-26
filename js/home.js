// UC-17
window.addEventListener('DOMContentLoaded', (event) => {
    createInnerHTML();
});

const createInnerHTML = () => {
    const innerHtml = `
    <tr>
        <th></th>
        <th>Name</th>
        <th>Gender</th>
        <th>Department</th>
        <th>Salary</th>
        <th>startDate</th>
        <th>Actions</th>
    </tr>
    <tr>
        <td>
            <img src="../assets/profile-images/Ellipse -5.png" alt="" class="profile">
        </td>
        <td>Mohit Shah</td>
        <td>Male</td>
        <td>
            <div class="dept-label">HR</div>
            <div class="dept-label">Finance</div>
        </td>
        <td>3000000</td>
        <td>1 Nov 2020</td>
        <td>
            <img id="1" onclick="remove(this)" src="../assets/icons/delete-black-18dp.svg" alt="delete">
            <img id="1" onclick="update(this)" src="../assets/icons/create-black-18dp.svg" alt="edit">
        </td>
        </tr>
    </tr>`;
    document.querySelector('#table-display').innerHTML = innerHtml;
}