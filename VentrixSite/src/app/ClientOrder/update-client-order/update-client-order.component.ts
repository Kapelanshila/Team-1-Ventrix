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
// import { ThemeService } from 'ng2-charts';
import { ClientOrderVM } from 'src/app/shared/ClientOrderVM';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-update-client-order',
  templateUrl: './update-client-order.component.html',
  styleUrls: ['./update-client-order.component.css']
})
export class UpdateClientOrderComponent implements OnInit {
  clientorderform : FormGroup;
  submitted = false;
  clicked = false;
  clients:Client[] = [];
  selectedClient:any;
  order!: ClientOrder;
  check!: ClientOrder;
  found = false;
  filename: string = '';
  selected!: FileList;
  orders:ClientOrder[] = [];
  clientorder: ClientOrder|undefined;
  selectedorder!:ClientOrderVM;
  disabled = false;
  disabledupdate = false;
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

    this.selectedorder = this.ventrixdbservice.getClientOrder()!;
    this.clientorderform.patchValue({
      description: this.selectedorder?.description,  
      })

      this.selectedClient = this.selectedorder.clientId;

      if (this.selectedorder.status == "Added" || this.selectedorder.status == "Packed" || this.selectedorder.status == "Delivered" || this.selectedorder.status == "En Route" || this.selectedorder.status == "Scheduled")
      {
        this.disabled = true;
      }

      if (this.selectedorder.status == "Delivered" || this.selectedorder.status == "En Route" || this.selectedorder.status == "Scheduled")
      {
        this.disabledupdate = true;
      }
  }

  uploadFile = (files: FileList) => {
    //In the event the user attempts to upload more than one file 

    if (this.clicked == true)
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

        if (this.clientorder != undefined && this.selectedorder.clientOrderId == this.clientorder.clientOrderId)
        {
            Swal.fire({
              icon: 'info',
              title: 'Same File Name Detected ',
              text: 'Would you like to update the current file stored on the system '+this.selectedorder.clientInvoice+' ?',
              showDenyButton: true,
              confirmButtonText: 'Yes',
              confirmButtonColor: '#077bff',
              allowOutsideClick: false,
              allowEscapeKey: false
            }).then((result) => {
              if (result.isConfirmed) {
                //Deletes and replaces file 
                this.ventrixdbservice.deleteClientOrderInvoice(this.selectedorder.clientInvoice.toString()).subscribe();

                formData.append('file', fileToUpload, fileToUpload.name);
                //Send file to api to be stored
                this.http.post('https://localhost:44324/api/File/uploadClientOrderInvoice', formData).subscribe();

                this.router.navigate(['/read-clientorder']).then(() => {
                window.location.reload();
                });
              }
              if (result.isDenied)
              {
                this.router.navigate(['/read-clientorder']).then(() => {
                  window.location.reload();
                  });
              }
            })      
        }
        else if (this.clientorder != undefined && this.selectedorder.clientOrderId != this.clientorder.clientOrderId)
        {
          Swal.fire({
            icon: 'warning',
            title: 'Duplicate File Name',
            confirmButtonText: 'OK',
            confirmButtonColor: '#077bff',
            allowOutsideClick: false,
            allowEscapeKey: false
          }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/read-clientorder']).then(() => {
              window.location.reload();
              });
          }
        });
        }
        else
        {
          this.ventrixdbservice.deleteClientOrderInvoice(this.selectedorder.clientInvoice.toString()).subscribe();
          formData.append('file', fileToUpload, fileToUpload.name);
  
          //Send file to api to be stored
          this.http.post('https://localhost:44324/api/File/uploadClientOrderInvoice', formData).subscribe();
          
          Swal.fire({
            icon: 'success',
            title: 'File Successfully Updated',
            confirmButtonText: 'OK',
            confirmButtonColor: '#077bff',
            allowOutsideClick: false,
            allowEscapeKey: false
          }).then((result) => {
            if(result.isConfirmed) {
                //If file changed save changes 
                this.order =
                {
                  clientOrderId: this.selectedorder.clientOrderId,
                  clientId : this.selectedClient,
                  description: this.clientorderform.get('description')?.value,
                  clientInvoice: fileToUpload.name,
                  encrypted: ''
                }
                this.ventrixdbservice.updateClientOrder(this.order).subscribe();

                this.router.navigate(['/read-clientorder']).then(() => {
                window.location.reload();
              })
            }
          })

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

  editClientOrderLine()
  {
    this.router.navigate(['/update-clientorderline']);
  }

  editClientOrder()
  {
    this.submitted = true;
    this.found = false;
    this.ventrixdbservice.readClientOrder()
    .subscribe(response => {
      this.orders = response;
      this.orders.forEach(element => {
        if (this.found == false && element.description.toLowerCase() == this.clientorderform.get('description')?.value.toLowerCase() && element.clientOrderId != this.selectedorder.clientOrderId)
        {
          this.found = true;
        }
      });
      

      if (this.clientorderform.valid && (this.selectedorder.clientId != this.selectedClient.clientId || this.clientorderform.dirty) || this.clientorderform.get('description')?.value.toLowerCase() != this.selectedorder.description.toLowerCase())
      {  
     if(this.found == true)
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
    else
    {
      this.order =
      {
        clientOrderId: this.selectedorder.clientOrderId,
        clientId : this.selectedClient,
        description: this.clientorderform.get('description')?.value,
        clientInvoice: this.selectedorder.clientInvoice,
        encrypted: CryptoJS.AES.encrypt(this.clientorderform.get('description')?.value.trim(), "coffee".trim()).toString(),
      }
      this.ventrixdbservice.updateClientOrder(this.order).subscribe();
      Swal.fire({
        icon: 'success',
        title: 'Client Order Successfully Updated',
        confirmButtonText: 'OK',
        confirmButtonColor: '#077bff',
        allowOutsideClick: false,
        allowEscapeKey: false
     }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['read-clientorder']).then(() => {
          window.location.reload();
        });
      }
    })
  }
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
