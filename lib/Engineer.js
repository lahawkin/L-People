const Employee = require ('./Employee.js');


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