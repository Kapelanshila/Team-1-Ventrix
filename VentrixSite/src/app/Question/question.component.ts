import { Component, OnInit } from '@angular/core';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Securityquestion } from '../shared/SecurityQuestion';
import { Securityanswer } from '../shared/SecurityAnswer';
import Swal from 'sweetalert2';
import { Account } from '../shared/Account';
import { UserSecurityQuestion } from '../shared/UserSecurityQuestion';
import { PathService } from '../services/path-service.service';
import { Employee } from '../shared/Employee';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  questionform: FormGroup;
  questions:Securityquestion[] = []
  submitted = false;
  qIDs:any[] = [];
  account!:Account;
  response1!: UserSecurityQuestion;
  response2!: UserSecurityQuestion;
  response3!: UserSecurityQuestion;
  check: string | undefined;
  resetform : FormGroup;
  passwordIsValid = false;
  title!: string;
  employees:Employee[] = [];
  employee!:Employee;
  closed = false;
  checkemployee!:Employee;
  role!:string;
  roles:any[] = [];
  users:any[] = [];
  user:any;

  constructor(fbuilder: FormBuilder, private router: Router,private ventrixdbservice:VentrixDBServiceService, private pathService:PathService)  
  { 
    this.questionform = fbuilder.group({
      question1: new FormControl ('',[Validators.required, this.noWhiteSpaceValidator]),
      question2: new FormControl ('',[Validators.required, this.noWhiteSpaceValidator]),
      question3: new FormControl ('',[Validators.required, this.noWhiteSpaceValidator]),
      answer1: new FormControl ('',[Validators.required, this.noWhiteSpaceValidator]),  
      answer2: new FormControl ('',[Validators.required, this.noWhiteSpaceValidator]),
      answer3: new FormControl ('',[Validators.required, this.noWhiteSpaceValidator])  
    });

    this.resetform = fbuilder.group({
      email: new FormControl (''),
      password: new FormControl (''),
      hashedPassword: new FormControl (''),
    });
  }

  ngOnInit(): void 
  {

    this.check = this.pathService.getPath();
    this.qIDs= [];
    this.ventrixdbservice.readSecurityquestion()
    .subscribe(response => {
      this.questions = response;
      console.log(this.questions)
    })
    this.account = this.ventrixdbservice.getAccount()!;
    console.log(this.ventrixdbservice.getAccount());

    if (this.check == '/register')
    {
      this.title = 'One More Thing...';
    }

    
    if (this.check == '/login')
    {
      this.title = 'Reset Email and Password';
    }
  }

  displayStyle = "none";
    //Modal Open and Close Functions
    openPopup() {
      this.displayStyle = "block";
    }
    closePopup() {
      this.displayStyle = "none";
    }
  
    passwordValid(event: boolean) {
      this.passwordIsValid = event;
    }

  get f() {return this.questionform.controls!; }

  addResponse()
  {
        //Checks if the user entered selected the same question
        this.submitted = true;
        if (this.questionform.get('question1')?.value == 
        this.questionform.get('question2')?.value ||
        this.questionform.get('question1')?.value == 
        this.questionform.get('question3')?.value ||
        this.questionform.get('question2')?.value == 
        this.questionform.get('question1')?.value ||
        this.questionform.get('question2')?.value == 
        this.questionform.get('question3')?.value ||
        this.questionform.get('question3')?.value == 
        this.questionform.get('question2')?.value ||
        this.questionform.get('question3')?.value == 
        this.questionform.get('question1')?.value )
        {
          Swal.fire({
            icon: 'warning',
            title: 'You cannot select the same question!',
            confirmButtonText: 'OK',
            confirmButtonColor: '#077bff',
            allowOutsideClick: false,
            allowEscapeKey: false
          }) 
        }
        else
        {
          //If the user chose to register
          if (this.check == '/register')
          {
            this.response1 = 
            {
              question: this.questionform.get('question1')?.value,
              answer: this.questionform.get('answer1')?.value,
            }
            this.response2 = 
            {
              question: this.questionform.get('question2')?.value,
              answer: this.questionform.get('answer2')?.value,
            }
            this.response3 = 
            {
              question: this.questionform.get('question3')?.value,
              answer: this.questionform.get('answer3')?.value,
            }
            this.qIDs.push(this.response1);
            this.qIDs.push(this.response2);
            this.qIDs.push(this.response3);
            this.ventrixdbservice.createUserSecurityQuestion(this.qIDs, this.account.emailAddress.toString()).subscribe()
            Swal.fire({
              icon: 'success',
              title: 'Questions and Answers Successfully Recorded',
              confirmButtonText: 'OK',
              confirmButtonColor: '#077bff',
              allowOutsideClick: false,
              allowEscapeKey: false
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['/login']).then(() => {
                  window.location.reload();
                });
              }
            })  
        }
        console.log(this.questions)
        if (this.check == '/login')
        {
          this.ventrixdbservice.forgotUser( this.questionform.get('answer1')?.value, this.questionform.get('answer2')?.value, this.questionform.get('answer3')?.value, this.questionform.get('question1')?.value,this.questionform.get('question2')?.value,this.questionform.get('question3')?.value)
          .subscribe(response => {
            this.account = response;
            Swal.fire({
              icon: 'success',
              title: 'Found Account',
              confirmButtonText: 'OK',
              confirmButtonColor: '#077bff',
              allowOutsideClick: false,
              allowEscapeKey: false
            })
            .then((result) => {
              if (result.isConfirmed) {
                this.displayStyle = "block";
              }
            });
          })
        }

    }
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

}
