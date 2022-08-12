/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { throwError } from 'rxjs';
import * as bcrypt from 'bcryptjs';
import { VentrixDBServiceService } from '../services/ventrix-db-service.service';
import { TokenStorageService } from '../services/interceptors/TokenStorageService';
import { PathService } from '../services/path-service.service';
import { AuthenticationService } from '../services/authentication-service';
import { Employee } from 'src/app/shared/Employee';
import { Account } from 'src/app/shared/Account';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginform: FormGroup;
  resetform: FormGroup;
  submitted = false;
  error = '';
  responsedata: any;
  users: any[] = [];
  valid = false;
  employees: Employee[] = [];
  employee!: Employee;
  password!: string;
  email!: string;
  account!: Account;
  passwordIsValid = false;
  closed = false;
  roles: any[] = [];
  role: any;
  user: any;

  constructor(
    fbuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private tokenStorageService: TokenStorageService,
    private ventrixdbservice: VentrixDBServiceService,
    private pathService: PathService,
    public toastController: ToastController
    ) {
    this.loginform = fbuilder.group({
      emailAddress: new FormControl('', [
        Validators.required,
        this.noWhitespaceValidator,
      ]),
      hashedPassword: new FormControl('', [
        Validators.required,
        this.noWhitespaceValidator,
      ]),
    });
  }

  ngOnInit(): void {
    this.pathService.clearPath();
    this.pathService.setPath('/login');
    this.closed = false;
    this.authenticationService.logout();
    this.ventrixdbservice.clearAccount();
    this.ventrixdbservice.clearEmail();
  }


  // Get value of formcontrol name to return it to api
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  get f() {
    return this.loginform.controls!;
  }

  login() {
    if(this.loginform.valid)
    {
    this.authenticationService
      .login(this.loginform.value)
      .subscribe((result) => {
        if (result != null) {

          this.ventrixdbservice.readEmployee().subscribe((response) => {
            this.employees = response;
  
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          // eslint-disable-next-line eqeqeq
          this.employee = this.employees.find(
            (x) => x.emailAddress == this.loginform.get('emailAddress')?.value
          )!;
  
            //For master account
            this.ventrixdbservice
            .readUser()
            // eslint-disable-next-line @typescript-eslint/no-shadow
            .subscribe((response: any[]) => {
              this.users = response;
    
              this.ventrixdbservice.readRole().subscribe((response: any[]) => {
                this.roles = response;
                
              this.user = this.users.find(
                (x) => x.userId == this.employee.userId
              );
              this.role = this.roles.find(
                (x) => x.userRoleId == this.user.userRoleId
              );
              //If the user is not registered based off the id number they cannot login
  
              if (
                this.employee != undefined &&
                this.employee.idnumber == undefined &&
                this.role.description != 'Master'
              ) 
              {
                this.register();
                }
                else{
                this.responsedata = result;
                localStorage.setItem('token', this.responsedata);
                this.account = {
                  employeeId: this.employee.employeeId,
                  name: this.employee.name,
                  surname: this.employee.surname,
                  idNumber: this.employee.idnumber,
                  phoneNumber: this.employee.phoneNumber,
                  homeAddress: this.employee.homeAddress,
                  emailAddress: this.employee.emailAddress,
                  titleId: this.employee.titleId,
                  userId: this.employee.userId,
                  hashedPassword: '',
                };
                this.ventrixdbservice.setAccount(this.account);
                this.navigateToHomePage();
              }
            })
          })
        })
      }
    });
    }
    else
    {
      this.invaliddetails();
    }
  }
  //Check no white spaces
  public noWhitespaceValidator(someFormControl: FormControl) {
    // eslint-disable-next-line no-var
    let iCount = 0;
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < someFormControl.value.length; i++) {
      if (someFormControl.value[i] == ' ') {
        iCount += 1;
      }
    }
    // eslint-disable-next-line eqeqeq
    if (iCount != someFormControl.value.length) {
      return null;
    }
    return { noWhitespaceValidator: true };
  }

  navigateToHomePage() {
    this.router.navigate(['home']);
  }

  async invaliddetails() {
    let toast;
      toast = await this.toastController.create({
        message: 'Invalid Details',
        color: 'danger',
        duration: 2000,
      });
    toast.present();
  }

  async register() {
    let toast;
      toast = await this.toastController.create({
        message: 'Please register your account',
        color: 'danger',
        duration: 2000,
      });
    toast.present();
  }
}
