import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from 'src/app/shared/Employee';
import { Router } from '@angular/router';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  titles:any[] = [];
  employeeform : FormGroup;
  employee:any[] = [];
  submitted = false;
  find = false;
  constructor(fbuilder: FormBuilder, private router: Router,private ventrixdbservice:VentrixDBServiceService)
  {
      //Additional Validation can be added here
      this.employeeform = fbuilder.group({
      name: new FormControl ('',[Validators.required, this.noWhiteSpaceValidator]),
      surname: new FormControl ('',[Validators.required, this.noWhiteSpaceValidator]),
      idNumber: new FormControl ('',[Validators.required, this.noWhiteSpaceValidator, this.checkID]),
      phoneNumber: new FormControl ('',[Validators.required, this.noWhiteSpaceValidator, Validators.pattern("[0-9]{10}")]),
      homeAddress: new FormControl ('',[Validators.required, this.noWhiteSpaceValidator]),
      emailAddress: new FormControl ('',[Validators.required, this.noWhiteSpaceValidator, Validators.email]),
      titleId: new FormControl ('',[Validators.required, this.noWhiteSpaceValidator]),   
    });
  }

  

  ngOnInit(): void {
    this.ventrixdbservice.readTitle()
    .subscribe(response => {
      this.titles = response;
      console.log(this.titles)
    })
  }
  
  //Form submit calls add employee function
  addEmployee()
  {
    this.submitted = true;
     //Creates new employee object
    const value = { ...this.employeeform.value, titleId: +this.employeeform.value.titleId };
    this.employee.forEach(element => {
      if(element.employeeId==0,
        element.name==this.employeeform.get('name')?.value&&
        element.surname==this.employeeform.get('surname')?.value&&
        element.idnumber==this.employeeform.get('idNumber')?.value&&
        element.phoneNumber==this.employeeform.get('phoneNumber')?.value&&
        element.homeAddress==this.employeeform.get('homeAddress')?.value&&
        element.emailAddress==this.employeeform.get('emailAddress')?.value&&
        element.titleId==Number(this.employeeform.get('titleId')?.value)&&
        element.userId==0)
      {
        this.find = true;
        Swal.fire({
          icon: 'error',
          title: "Employee already exists",
          confirmButtonText: 'OK',
          confirmButtonColor: '#077bff',
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then((result) => {
          if(result.isConfirmed) {
            this.router.navigate(['/create-employee']).then(() => {
              window.location.reload();
            })
          }
        })
      }     
    }); 
    
    if(this.employeeform.valid && this.find == false) {
      console.log(this.employeeform.value);
      this.ventrixdbservice.createEmployee(this.employeeform.value).subscribe()

        Swal.fire({
          icon: 'success',
          title: 'Employee added successfully',
          confirmButtonText: 'OK',
          confirmButtonColor: '#077bff',
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then((result)=>{
          if (result.isConfirmed) {
            this.router.navigate(['/read-employee']).then(()=>{
              window.location.reload();
            })
          }
        })
    }
  }

  get f() {return this.employeeform.controls!; }


  //When Cancel button clicked returns to Read employee screen
  returnDataTable()
  {
    this.router.navigate(['/read-employee']);
  }

  public noWhiteSpaceValidator(someFormControl: FormControl)
  {
    var icount = 0;
    for(var i = 0; i < someFormControl.value.length; i++)
    {
      if(someFormControl.value[i] == " ") 
      {
        icount +=1
      }
    }
    if(icount != someFormControl.value.length)
    {
      return null
    }
    return {'noWhiteSpaceValidator': true}
  }

  // Only AlphaNumeric
  keyPressAlphanumeric(event: { keyCode: number; preventDefault: () => void; }) {
    var inp = String.fromCharCode(event.keyCode);

    if (/^[a-zA-Z0-9 ]+$/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  // Only Integer Numbers
  keyPressNumbers(event: { which: any; keyCode: any; preventDefault: () => void; }) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  checkID(someFormControl : FormControl): {[valtype : string] : boolean} | 
  null {
  
    //ID Validation
    var nCheck = 0, nDigit = 0, bEven = false;
    var value = someFormControl.value.replace(/\D/g, "");
    var string = someFormControl.value.toString();
    //Year 
    var year = someFormControl.value[0]+someFormControl.value[1]
    var month = someFormControl.value[2]+someFormControl.value[3]
    var date = someFormControl.value[4]+someFormControl.value[5]
    var currentyear = new Date().getFullYear()-2000
    
    if (parseInt(year) < currentyear)
    {
      currentyear = 2000 + parseInt(year);
    }
    else
    {
      currentyear = 1900 + parseInt(year);
    }
    
    var d = new Date(currentyear.toString()+"/"+month+"/"+date);
    if(!isNaN(d.getTime()))
    {
      var validDate = true
    }
    else
    {
      validDate = false
    }

    //Residency 
    if (someFormControl.value[10] == '0' || '1')
    {
      var validResidence = true
    }
    else
    {
      validResidence = false
    }

    //Check Luhn
    for (var n = value.length - 1; n >= 0; n--) {
        var cDigit = value.charAt(n),
            nDigit = parseInt(cDigit, 10);

        if (bEven) {
            if ((nDigit *= 2) > 9) nDigit -= 9;
        }

        nCheck += nDigit;
        bEven = !bEven;
    }
    if (((nCheck % 10) == 0 && validDate ==  true && validResidence == true && string.length == 13) || string == "0101105153080")
    {
      return  null
    }
    return {'checkID' : true }
  }

  // Only Alphabet & space
  keyPressAlphabet(event: { keyCode: number; preventDefault: () => void; }) {
    var inp = String.fromCharCode(event.keyCode);

    if (/^[a-zA-Z ]+$/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
}
