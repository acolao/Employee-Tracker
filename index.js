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

function addDepartment() {
    prompt([
        {
            name: "department",
            message: "What is the name of the department being added?"
        }
    ])
    .then(res => {
        let name = res;
        db.createDepartment(name)
        .then(() => console.log('Department added!'))
        .then(() => loadMainPrompts())
    })
}

function viewRoles() {
    db.findAllRoles()
    .then(([rows]) => {
        let roles = rows;
        console.log("\n");
        console.table(roles);
    })
    .then(() => loadMainPrompts());
}

function addRole() {
    prompt([
        {
            name: "role",
            message: "What is the name of the role being added?"
        }
    ])
    .then(res => {
        let name = res;
        db.createRole(name)
        .then(() => console.log('Role added!'))
        .then(() => loadMainPrompts())
    })
}

function viewEmployees() {
    db.findAllEmployees()
    .then(([rows]) => {
        let employees = rows;
        console.log("\n");
        console.table(employees);
    })
    .then(() => loadMainPrompts());
}

function addEmployee() {
    prompt([
        {
        name: "first_name",
        message: "What is the employee's first name?"
        },
        {
        name: "last_name",
        message: "What is the employee's last name?"
        }   
    ])
    .then(res => {
        let firstName = res.first_name;
        let lastName = res.last_name;
        db.createEmployee(name)
        .then(() => console.log('Employee added!'))
        .then(() => loadMainPrompts())
    })
}

function quit() {
  process.exit();
}