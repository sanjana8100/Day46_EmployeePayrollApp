let empPayrollList;
window.addEventListener('DOMContentLoaded', (event) => {
    empPayrollList = getEmployeePayrollDataFromStorage();
    createInnerHtml();
    localStorage.removeItem('editEmp');
});

const getEmployeePayrollDataFromStorage = () => {
    return localStorage.getItem('employeePayrollList') ? JSON.parse(localStorage.getItem('employeePayrollList')) : [];
}

const createInnerHtml = () => {
    const headerHtml =
       `<th>Profile</th>
        <th>Name</th>
        <th>Gender</th>
        <th>Department</th>
        <th>Salary</th>
        <th>Start Date</th>
        <th>Actions</th>`;

    let employeePayrollDataList = createEmployeePayrollJSON();
    if(employeePayrollDataList.length == 0) return;
    let innerHtml = `${headerHtml}`;
    for(const employeePayrollData of employeePayrollDataList){
        innerHtml = `${innerHtml}
        <tr>
        <td>
        <img class="profile" src="${employeePayrollData._profileImage}" alt="profile_img-1"></td>
        <td>${employeePayrollData._name}</td>
        <td>${employeePayrollData._gender}</td>
        <td>${getDepartmentHtml(employeePayrollData._department)}</td>      
        <td>${employeePayrollData._salary}</td>
        <td>${employeePayrollData._startDate}</td>
        <td>
        <img src="/assets/icons/delete-black-18dp.svg" alt="delete" id="1" onclick="remove(this)">
        <img src="/assets/icons/create-black-18dp.svg" alt="edit" id="1" onclick="update(this)">
        </td>
        </tr>`;
    }
    document.querySelector('#display').innerHTML = innerHtml;
}

const createEmployeePayrollJSON = () => {
    let employeePayrollListLocal = [
      {
        _name: 'Neha',
        _gender: 'Female',
        _department: [
          'HR'
        ],
        _salary: 350000,
        _startDate: '20 Jul 2016',
        _note: 'Test',
        _id: new Date().getTime(),
        _profileImage: '/assets/profile-images/Ellipse -4.png' 
      },
      {
        _name: 'Karthik',
        _gender: 'Male',
        _department: [
          'Engineer'
        ],
        _salary: 400000,
        _startDate: '02 Mar 2020',
        _note: 'Test to JSON',
        _id: new Date().getTime(),
        _profileImage: '/assets/profile-images/Ellipse -3.png'
      }
    ];
    return localStorage.getItem("employeePayrollList");
}
const getDepartmentHtml = (departmentList) => {
    let departmentHtml = '';
    for(const department of departmentList){
      departmentHtml = `${departmentHtml} <div class='dept-label'>${department}</div>`
    }
    return departmentHtml
}
const remove = (node) => {
  let empPayrollData =empPayrollList.find(empData => empData._id == node._id);
  if(!empPayrollData) return;
  const index = empPayrollList.map(empData => empData._id).indexOf(empPayrollData._id);
  empPayrollList.splice(index,1);
  localStorage.setItem("EmployeePayrollList",JSON.stringify(empPayrollList));
  document.querySelector(".emp-count").textContent = empPayrollList.length;
  createInnerHtml();
}