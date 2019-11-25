const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const inquirer = require("inquirer");
//const helper = require("./helper");



//okay so here is where we get started with the inquirer thing
questions_for_all_employees = [
    {
        type: "input",
        name: "name",
        message: "What name?"
    },
    {
        type: "input",
        name: "idNum",
        message: "What is their id?"
    },
    {
        type: "input",
        name: "choice",
        message: "What kind of employee?",
    },
    {
        type: "input",
        name: "email",
        message: "What email?"
    }

]

answers = [];

managers_questions = [
    {
        type: "input",
        name: "officeNumber",
        message: "What is their office number?",
    }
]


function employeeChoice() {
    inquirer.prompt(questions_for_all_employees)
        .then(val => {
            console.log(val);
            console.log(val.type);
            switch (val.choice) {
                case "Manager":
                    manager(val);

                    break;
                case "Engineer":
                    engineer(val);
                    //get some more questions
                    //add it to the html
                    break;
                case "Intern":
                    intern(val);
                    //get some more questions
                    //add it to the html
                    break;
                default:
                    break;
            }
            //
        });


}
employeeChoice();

function intern(val) {
    const varIn = new Intern(val.name, val.idNum, val.email);
    console.log("Intern");
    //TODO get more questions
    //inquirer.prompt(){

}


function engineer(val) {
    const varEng = new Engineer(val.name, val.idNum, val.email);
    console.log("Engineer");
    //TODO get more questions
}

function manager(val) {

    inquirer.prompt(managers_questions).then(extra => {
        const varMan = new Manager(val.name, val.idNum, extra.officeNumber, val.email)
        console.log("Manager");

        //TODO get some more questions
        writeFile();
    });

}

function writeFile() {

    const fs = require('fs');

    const templateFile = fs
        .readFileSync(
            './templates/manager.html',
            { encoding: 'utf8' }
        );
    let temporaryFile = templateFile.replace('{{id}}', '123');


    temporaryFile = temporaryFile.replace('{{email1}}', 'Bob@subgenius.org')
    temporaryFile = temporaryFile.replace('{{email2}}', 'Bob@subgenius.org')

    temporaryFile = temporaryFile.replace('{{officeNumber}}', '3'); 
    console.log("temp file", temporaryFile);
}
//employeeChoice();
writeFile(); 
