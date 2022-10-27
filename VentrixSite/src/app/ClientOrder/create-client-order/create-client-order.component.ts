import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client } from 'src/app/shared/Client';
import { Router } from '@angular/router';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpClient, HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { ClientOrder } from 'src/app/shared/ClientOrder';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import { ClientOrderVM } from 'src/app/shared/ClientOrderVM';
// import { ThemeService } from 'ng2-charts';

@Component({
  selector: 'app-create-client-order',
  templateUrl: './create-client-order.component.html',
  styleUrls: ['./create-client-order.component.css']
})
export class CreateClientOrderComponent implements OnInit {
  clientorderform : FormGroup;
  submitted = false;
  clicked = false;
  clients:Client[] = [];
  selectedClient:any;
  order!: ClientOrder;
  filename: string = '';
  selected!: FileList;
  orders:ClientOrder[] = [];
  clientorder: ClientOrder|undefined;
  disabled = false;
  conversionEncryptOutput!: string;  
  setOrder!:ClientOrderVM;
  @Output() public onUploadFinished = new EventEmitter();


  constructor(fbuilder: FormBuilder, private router: Router,private ventrixdbservice:VentrixDBServiceService,  private http: HttpClient)
  {
      //Additional Validation can be added here
      this.clientorderform = fbuilder.group({
        description: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
      });
  }

  ngOnInit(): void 
  {
    this.ventrixdbservice.readClient()
    .subscribe(response => {
      this.clients = response;
    })
    this.filename = '';
    this.clicked = false;
    this.disabled = false;
  }

  uploadFile = (files: FileList) => {
    //In the event the user attempts to upload more than one file 

    if (this.clicked == true && this.filename != '')
    {
      this.ventrixdbservice.deleteClientOrderInvoice(this.filename).subscribe();
    }
    
      let fileToUpload = <File>files[0];
      const formData = new FormData();
      this.filename = fileToUpload.name;

      //Checks files dont have the same name 
      this.ventrixdbservice.readClientOrder()
      .subscribe(response => {
        this.orders = response;
        this.clientorder = this.orders.find(x => x.clientInvoice.toLowerCase() == this.filename.toLowerCase());

        if (this.clientorder != undefined)
        {
          this.filename = '';
          this.disabled = true;
          Swal.fire({
            icon: 'warning',
            title: 'Duplicate File Name',
            confirmButtonText: 'OK',
            confirmButtonColor: '#077bff',
            allowOutsideClick: false,
            allowEscapeKey: false
          })
        }
        else
        {
          this.disabled = false;
          formData.append('file', fileToUpload, fileToUpload.name);
  
          //Send file to api to be stored
          this.http.post(environment.apiUrl+'File/uploadClientOrderInvoice', formData).subscribe();
    
          this.clicked = true;
        }
      })
  }


  get f() { return this.clientorderform.controls!; }

  //When Cancel button clicked returns to Read Client screen
  returnDataTable()
  {
    this.router.navigate(['/read-clientorder']);
    if (this.filename != '')
    {
      this.ventrixdbservice.deleteClientOrderInvoice(this.filename).subscribe();
    }
  }

  addClientOrder()
  {
    this.submitted = true;
    this.ventrixdbservice.readClientOrder()
    .subscribe(response => {
      this.orders = response;

    if (this.filename =='')
    {
      Swal.fire({
        icon: 'warning',
        title: 'No file selected',
        confirmButtonText: 'OK',
        confirmButtonColor: '#077bff',
        allowOutsideClick: false,
        allowEscapeKey: false
      })
    }
    
    //No duplicate description fro client order
    if(this.orders.find(x => x.description.toLowerCase() == this.clientorderform.get('description')?.value.toLowerCase()) != undefined )
    {
      Swal.fire({
        icon: 'warning',
        title: 'Duplicate Client Order Description',
        confirmButtonText: 'OK',
        confirmButtonColor: '#077bff',
        allowOutsideClick: false,
        allowEscapeKey: false
      })
    }

    if (this.clientorderform.valid && this.filename != '' && this.disabled == false && this.orders.find(x => x.description.toLowerCase() == this.clientorderform.get('description')?.value.toLowerCase()) == undefined )
    {

      this.order =
      {
        clientOrderId: 0,
        clientId : this.selectedClient,
        description: this.clientorderform.get('description')?.value,
        clientInvoice: this.filename,
        encrypted: CryptoJS.AES.encrypt(this.clientorderform.get('description')?.value.trim(), "coffee".trim()).toString(),
      }

      Swal.fire({
        icon: 'success',
        title: 'Client Order Successfully Added',
        confirmButtonText: 'OK',
        confirmButtonColor: '#077bff',
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then((result) => {
        if (result.isConfirmed) {
          this.ventrixdbservice.createClientOrder(this.order).subscribe();

          this.setOrder = 
          {
            clientId: this.order.clientId,
            clientInvoice: this.order.clientInvoice,
            description: this.order.description,
            clientOrderId: this.order.clientOrderId,
            encrypted: this.order.encrypted,
            contactPersonName:'',
            contactPersonSurname:'',
            emailAddress:'',
            status:''
          }
          
          this.ventrixdbservice.setClientOrder(this.setOrder);
          this.router.navigate(['/read-clientorderline']).then(() => {
            window.location.reload();
          });
        }
      })  
    }
    })
  }

    //Check no white spaces
    public noWhitespaceValidator(someFormControl: FormControl) 
    {
      var iCount = 0;
      for(var i = 0; i < someFormControl.value.length; i++)
      {
        if (someFormControl.value[i] == " ")
        {
          iCount += 1
        }
      }
      if (iCount != someFormControl.value.length)
      {
        return  null
      }
      return {'noWhitespaceValidator' : true}
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
