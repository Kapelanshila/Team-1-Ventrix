import { Component, OnInit } from '@angular/core';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Securityquestion } from '../shared/SecurityQuestion';
import { Securityanswer } from '../shared/SecurityAnswer';
import Swal from 'sweetalert2';
import { Register } from '../shared/Register';
import { UserSecurityQuestion } from '../shared/UserSecurityQuestion';

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
  account!:Register;
  response1!: UserSecurityQuestion;
  response2!: UserSecurityQuestion;
  response3!: UserSecurityQuestion;

  constructor(fbuilder: FormBuilder, private router: Router,private ventrixdbservice:VentrixDBServiceService)  
  { 
    this.questionform = fbuilder.group({
      question1: new FormControl ('',[Validators.required, this.noWhiteSpaceValidator]),
      question2: new FormControl ('',[Validators.required, this.noWhiteSpaceValidator]),
      question3: new FormControl ('',[Validators.required, this.noWhiteSpaceValidator]),
      answer1: new FormControl ('',[Validators.required, this.noWhiteSpaceValidator]),  
      answer2: new FormControl ('',[Validators.required, this.noWhiteSpaceValidator]),
      answer3: new FormControl ('',[Validators.required, this.noWhiteSpaceValidator])  
    });
  }

  ngOnInit(): void 
  {
    this.qIDs= [];
    this.ventrixdbservice.readSecurityquestion()
    .subscribe(response => {
      this.questions = response;
      console.log(this.questions)
    })
    this.account = this.ventrixdbservice.getAccount()!;
    console.log(this.ventrixdbservice.getAccount());
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
