// UC-21
let isUpdate = false;
let employeePayrollObj = {};

// UC-10
window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new EmployeePayrollData()).name = name.value;;
            textError.textContent = "";
        } catch (e) {
            textError.textContent = e;
        }
    });

    // UC-8
    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function () {
        output.textContent = salary.value;
    });

    // const date = document.querySelector('#date');
    // date.addEventListener('input', function() {
    //     const startDate = new Date(Date.parse(getInputValuesById('#day')+" "+
    //                             getInputValuesById('#month')+" "+
    //                             getInputValuesById('#year')));
    //     try{
    //         (new EmployeePayrollData()).startDate = startDate;
    //         setTextValue('.date-error'," ");
    //     }catch(e){
    //         setTextValue('.date-error', e);
    //     }
    // });

    checkForUpdate();
});


// UC-21
const checkForUpdate = () => {
    const employeePayrollJson = localStorage.getItem('editEmp');
    isUpdate = employeePayrollJson ? true : false;
    if(!isUpdate) return;
    employeePayrollObj = JSON.parse(employeePayrollJson);
    setForm();
}

const setForm = () => {
    setValue('#name', employeePayrollObj._name);
    setSelectedValues('[name=profile]', employeePayrollObj._profilepic);
    setSelectedValues('[name=gender]', employeePayrollObj._gender);
    setSelectedValues('[name=department]', employeePayrollObj._department);
    setValue('#salary', employeePayrollObj._salary);
    setTextValue('.salary-output', employeePayrollObj._salary);
    setValue('#notes', employeePayrollObj._note);
    let date = stringifyDate(employeePayrollObj._startDate).split(" ");
    setValue('#day', date[0]);
    setValue('#month', date[1]);
    setValue('#year', date[2]);

}

// UC-22
const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try{
        setEmployeePayrollObject();
        createAndUpdateStorage();
        resetForm();
    }catch (e) {
        return;
    }
}

function setEmployeePayrollObject(){
    employeePayrollObj._name = getInputValuesById('#name');
    employeePayrollObj._profilepic = getSelectedValues('[name=profile]').pop();
    employeePayrollObj._gender = getSelectedValues('[name=gender]').pop();
    employeePayrollObj._department = getSelectedValues('[name=department]');
    employeePayrollObj._salary = getInputValuesById('#salary');
    employeePayrollObj._note = getInputValuesById('#notes');
    let date = getInputValuesById('#day')+" "+getInputValuesById('#month')+" "+getInputValuesById('#year');
    employeePayrollObj._startDate = date; 
}

function createAndUpdateStorage(){
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList){
        let empPayrollData = employeePayrollList.find(empData => empData._id == employeePayrollObj._id);
        if (!empPayrollData){
            employeePayrollList.push(createEmployeePayrollData());
        }
        else{
            const index = employeePayrollList.map(empData => empData._id).indexOf(empPayrollData._id);
            employeePayrollList.splice(index,1,createEmployeePayrollData(empPayrollData._id));
        }
    }
    else{
        employeePayrollList = [createEmployeePayrollData()];
    }
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}

const createEmployeePayrollData = (id) => {
    let employeePayrollData = new EmployeePayrollData();
    if(!id){
        employeePayrollData.id = createNewEmployeeId();
    }
    else{
        employeePayrollData.id = id;
    }
    setEmployeePayrollData(employeePayrollData);
    return employeePayrollData;
}

const setEmployeePayrollData = (employeePayrollData) => {
    try{
        employeePayrollData.name = employeePayrollObj._name;
    }catch(e){
        setTextValue('.text-error',e);
        throw e;
    }

    employeePayrollData.profilepic = employeePayrollObj._profilepic;
    employeePayrollData.gender = employeePayrollObj._gender;
    employeePayrollData.department = employeePayrollObj._department;
    employeePayrollData.salary = employeePayrollObj._salary;
    employeePayrollData.note = employeePayrollObj._note;
    employeePayrollData.startDate = new Date(Date.parse(employeePayrollObj._startDate));
    // try{
    //     employeePayrollData.startDate = new Date(Date.parse(employeePayrollObj._startDate));
    // }catch(e){
    //     setTextValue('.date-error', e);
    //     throw e;
    // }
    alert(employeePayrollData.toString());
}

const createNewEmployeeId = () => {
    let empID = localStorage.getItem("EmployeeID");
    empID = !empID ? 1 : (parseInt(empID) + 1).toString();
    localStorage.setItem("EmployeeID",empID);
    return empID;
}

const getSelectedValues = (propertyValue,value) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach(item => {
        if(item.checked){
            selItems.push(item.value);
        }
    });
    return selItems;
}
// UC-22 TILL HERE

const setSelectedValues = (propertyValue, value) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        if(Array.isArray(value)){
            if(value.includes(item.value)){
                item.checked = true;
            }
        }
        else if(item.value === value){
            item.checked = true;
        }
    });
}

const getInputValuesById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

const getInputElementValue = (id) => {
    let value = document.getElementById(id).value;
    return value;
}

// UC-13
const resetForm = () => {
    setValue('#name','');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary','');
    setValue('#notes','');
    setSelectedIndex('#day',0);
    setSelectedIndex('#month',0);
    setSelectedIndex('#year',0);
}

const setSelectedIndex = (id, index) => {
    const element = document.querySelector(id);
    element.setSelectedIndex = index;
}

const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });
}

const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}