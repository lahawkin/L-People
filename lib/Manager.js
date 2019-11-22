const Employee = require('./Employee');

class Manager extends Employee {
    constructor (name, id, email, officeNumber) {
        super (name, id, "Manager"); 
        this.officeNumber = officeNumber;
        this.email = email; 
    }

    getRole() {
        return "Manager"; 
    }

    getOffice() {
        return this.officeNumber; 
    }

}