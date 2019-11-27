const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const inquirer = require("inquirer");
const fileSystem = require('fs');


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
managers_questions = [
    {
        type: "input",
        name: "officeNumber",
        message: "What is their office number?",
    }
]
engineer_questions = [
    {
        type: "input",
        name: "github",
        message: "What is their github?",
    }
]
intern_question = [
    {
        type: "input",
        name: "school",
        message: "What school do they go to?",
    }
]

team_question = [
    {
        type: "input",
        name: "team",
        message: "what is your team name?"
    }
]
add_to_team_question = [
    {
        type: "input",
        name: "add",
        message: "would you like to add to the team? yes/no "
    }
]

function start() {
    inquirer.prompt(team_question).then(val => {
        const fs = fileSystem;
        console.log(val);
        console.log(val.team); 
        const templateFile = fs
            .readFileSync('./templates/main.html', { encoding: 'utf8' });
        let temporaryFile = templateFile.replace('{{team}}', val.team);
        fs.writeFileSync("./output/final.html", temporaryFile, 'utf8');

        inputMembers();
    })


}

function inputMembers() {
    var teamSize;

    inquirer.prompt(add_to_team_question).then(choice => {
        if (choice.add == 'yes')
            employeeChoice();
        else
            console.log("congrats on your team.  see output/final.html ")
    });

}

function employeeChoice() {
    inquirer.prompt(questions_for_all_employees)
        .then(val => {
            switch (val.choice) {
                case "manager":
                    manager(val);
                    break;
                case "engineer":
                    engineer(val);
                    break;
                case "intern":
                    intern(val);
                    break;
                default:
                    break;
            }
        });
}

function intern(val) {
    inquirer.prompt(intern_question).then(extra => {
        var varIntern = new Intern(val.name, val.idNum, val.email, extra.school);
        const fs = fileSystem;
        const templateFile = fs
            .readFileSync('./templates/intern.html', { encoding: 'utf8' });
        let temporaryFile = templateFile.replace('{{name}}', varIntern.name);
        temporaryFile = temporaryFile.replace('{{role}}', varIntern.getRole());
        temporaryFile = temporaryFile.replace('{{id}}', varIntern.id);
        temporaryFile = temporaryFile.replace('{{email1}}', varIntern.email);
        temporaryFile = temporaryFile.replace('{{email2}}', varIntern.email);
        temporaryFile = temporaryFile.replace('{{school}}', varIntern.getSchool());
        fs.appendFile("./output/final.html", temporaryFile, err => {
            console.log(err)
        });
        //console.log("temp file", temporaryFile);

        inputMembers();
    });
}

function engineer(val) {

    inquirer.prompt(engineer_questions).then(extra => {
        const varEng = new Engineer(val.name, val.idNum, val.email, extra.github);
        const fs = require('fs');
        const templateFile = fs
            .readFileSync('./templates/engineer.html', { encoding: 'utf8' });
        let temporaryFile = templateFile.replace('{{id}}', varEng.id);
        temporaryFile = temporaryFile.replace('{{name}}', varEng.name);
        temporaryFile = temporaryFile.replace('{{role}}', varEng.getRole());
        temporaryFile = temporaryFile.replace('{{email1}}', varEng.email);
        temporaryFile = temporaryFile.replace('{{email2}}', varEng.email);
        temporaryFile = temporaryFile.replace('{{github1}}', varEng.getGithub());
        temporaryFile = temporaryFile.replace('{{github2}}', varEng.getGithub());

        fs.appendFile("./output/final.html", temporaryFile, err => {
            console.log(err)
        });
        //console.log("temp file", temporaryFile);
        inputMembers();
    });
}

function manager(val) {
    inquirer.prompt(managers_questions).then(extra => {
        const varMan = new Manager(val.name, val.idNum, val.email, extra.officeNumber)
        const fs = require('fs');
        const templateFile = fs
            .readFileSync('./templates/manager.html', { encoding: 'utf8' });
        let temporaryFile = templateFile.replace('{{role}}', varMan.getRole);
        temporaryFile = temporaryFile.replace('{{id}}', varMan.id);
        temporaryFile = temporaryFile.replace('{{email1}}', varMan.email);
        temporaryFile = temporaryFile.replace('{{email2}}', varMan.email);
        temporaryFile = temporaryFile.replace('{{officeNumber}}', varMan.getOffice());
        fs.appendFile("./output/final.html", temporaryFile, err => {
            console.log(err)
        });
        //console.log("temp file", temporaryFile);
        inputMembers();
    });
}

start(); 