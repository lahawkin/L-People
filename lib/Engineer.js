const Employee = require ("../lib/Employee.js");


class Engineer extends Employee {
    constructor (name, id, email, github){
        super(name, id, "Engineer"); 
        this.github = github; 
        this.email = email; 
    }

    getGithub() {
        return this.github;
    }

    getRole() {
        return "Engineer"; 
    }
}
module.exports = Engineer; 