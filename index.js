const { Prompt } = require('inquirer');
const fs = require('fs');
const db = require('./db/connection');

function loadMainPrompts() {
  prompt([
    {
      type: "list",
      name: "choice",
      message: "Select an option",
       choices: [
        {
          name: "View All Employees",
          value: "VIEW_EMPLOYEES"
        },
        {
          name: "Add Employee",
          value: "ADD_EMPLOYEE"
        },
        {
          name: "Update Employee Role",
          value: "UPDATE_EMPLOYEE_ROLE"
        },
        {
          name: "View All Roles",
          value: "VIEW_ROLES"
        },
        {
          name: "Add Role",
          value: "ADD_ROLE"
        },
        {
          name: "View All Departments",
          value: "VIEW_DEPARTMENTS"
        },
        {
          name: "Add Department",
          value: "ADD_DEPARTMENT"
        },
        {
          name: "Quit",
          value: "QUIT"
        }
      ]
  
    } 

    ])
    .then(res => {
    let choice = res.choice;

    switch (choice) {
        case "VIEW_EMPLOYEES":
            viewEmployees();
            break;
        case "ADD_EMPLOYEE":
            addEmployee();
            break;
        case "UPDATE_EMPLOYEE_ROLE":
            updateEmployeeRole();
            break;
        case "VIEW_ROLES":
            viewRoles();
            break;
        case "ADD_ROLE":
            addRole();
            break;
        case "VIEW_DEPARTMENTS":
            viewDepartments();
            break;
        case "ADD_DEPARTMENT":
            addDepartment();
            break;
        default:
            quit();
    }

});

}

function viewDepartments() {
    db.findAllDepartments()
    .then(([rows]) => {
        let departments = rows;
        console.log("\n");
        console.table(departments);
    })
    .then(() => loadMainPrompts());
}