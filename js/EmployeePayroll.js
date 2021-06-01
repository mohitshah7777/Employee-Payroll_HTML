//UC-9
class EmployeePayrollData{

    get id(){ return this._id; }
    set id(id){
        this._id=id;
    }

    get name(){ return this._name; }
    set name(name){
        let nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}$');
        if( nameRegex.test(name)){
            this._name=name;
        }
        else throw 'Name is Incorrect';  
    }
    
    get profilepic(){ return this._profilepic; }
    set profilepic(profilepic){
        this._profilepic=profilepic;
    }

    get gender(){ return this._gender; }
    set gender(gender){
        this._gender=gender;
    }
    
    get department(){ return this._department; }
    set department(department){
        this._department=department;
    }
    
    get salary(){ return this._salary; }
    set salary(salary){
        this._salary=salary;
    }

    get note(){ return this._note; }
    set note(note){
        this._note=note;
    }

    get startDate(){ return this._startDate; }
    set startDate(startDate){
        // let now = new Date();
        // if(startDate > now) throw 'Start Date is a future Date';
        // var diff = Math.abs(now.getTime() - startDate.getTime());
        // if(diff / (1000 * 60 * 60 * 24) > 30)
        //     throw 'Start Date is beyond 30 days';
        this._startDate=startDate;
    }

    toString(){
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const empDate = !this.startDate ? "undefined" :
                        this.startDate.toLocaleDateString("en-us", options);
        return "id= " +this.id +"\nname='"+this.name + "\ngender='" + this.gender +
                    "\nprofilepic='" + this.profilepic + "\ndepartment='" + this.department +
                    "\nsalary='" + this.salary + "\nstartDate='" + empDate + "\nnote='" + this.note; 
    }
}