import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Supplier } from 'src/app/shared/Supplier';
import { Router } from '@angular/router';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpClient, HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { SupplierOrder } from 'src/app/shared/SupplierOrder';
// import { ThemeService } from 'ng2-charts';
import { SupplierOrderVM } from 'src/app/shared/SupplierOrderVM';


@Component({
  selector: 'app-update-supplier-order',
  templateUrl: './update-supplier-order.component.html',
  styleUrls: ['./update-supplier-order.component.css']
})
export class UpdateSupplierOrderComponent implements OnInit {

  supplierorderform : FormGroup;
  submitted = false;
  clicked = false;
  suppliers:Supplier[] = [];
  selectedSupplier:any;
  order!: SupplierOrder;
  filename: string = '';
  selected!: FileList;
  orders:SupplierOrder[] = [];
  supplierorder: SupplierOrder|undefined;
  selectedorder!:SupplierOrderVM;
  disabled = false;
  disabledupdate = false;
  found = false;
  @Output() public onUploadFinished = new EventEmitter();


  constructor(fbuilder: FormBuilder, private router: Router,private ventrixdbservice:VentrixDBServiceService,  private http: HttpClient)
  {
      //Additional Validation can be added here
      this.supplierorderform = fbuilder.group({
        description: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
      });
  }

  ngOnInit(): void 
  {
    this.ventrixdbservice.readSupplier()
    .subscribe(response => {
      this.suppliers = response;
    })
    this.filename = '';
    this.clicked = false;

    this.selectedorder = this.ventrixdbservice.getSupplierOrder()!;
    this.supplierorderform.patchValue({
      description: this.selectedorder?.description,  
      })

      
      if (this.selectedorder.inventories == false)
      {
        this.disabled = true;
      }

      this.selectedSupplier = this.selectedorder.supplierId;
      console.log(this.selectedorder)
  }

  uploadFile = (files: FileList) => {
    //In the event the user attempts to upload more than one file 

    if (this.clicked == true)
    {
      this.ventrixdbservice.deleteSupplierOrderInvoice(this.filename).subscribe();
    }
    
      let fileToUpload = <File>files[0];
      const formData = new FormData();
      this.filename = fileToUpload.name;

      //Checks files dont have the same name 
      this.ventrixdbservice.readSupplierOrder()
      .subscribe(response => {
        this.orders = response;
        this.supplierorder = this.orders.find(x => x.supplierInvoice.toLowerCase() == this.filename.toLowerCase());

        if (this.supplierorder != undefined && this.selectedorder.supplierOrderId == this.supplierorder.supplierOrderId)
        {
            Swal.fire({
              icon: 'info',
              title: 'Same File Name Detected ',
              text: 'Would you like to update the current file stored on the system '+this.selectedorder.supplierInvoice+' ?',
              showDenyButton: true,
              confirmButtonText: 'Yes',
              confirmButtonColor: '#077bff',
              allowOutsideClick: false,
              allowEscapeKey: false
            }).then((result) => {
              if (result.isConfirmed) {
                //Deletes and replaces file 
                this.ventrixdbservice.deleteSupplierOrderInvoice(this.selectedorder.supplierInvoice.toString()).subscribe();

                formData.append('file', fileToUpload, fileToUpload.name);
                //Send file to api to be stored
                this.http.post('https://localhost:44324/api/File/uploadSupplierOrderInvoice', formData).subscribe();

                this.router.navigate(['/read-supplierorder']).then(() => {
                window.location.reload();
                });
              }
              if (result.isDenied)
              {
                this.router.navigate(['/read-supplierorder']).then(() => {
                  window.location.reload();
                  });
              }
            })      
        }
        else if (this.supplierorder != undefined && this.selectedorder.supplierOrderId != this.supplierorder.supplierOrderId)
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
            this.router.navigate(['/read-supplierorder']).then(() => {
              window.location.reload();
              });
          }
        });
        }
        else
        {
          this.ventrixdbservice.deleteSupplierOrderInvoice(this.selectedorder.supplierInvoice.toString()).subscribe();
          formData.append('file', fileToUpload, fileToUpload.name);
  
          //Send file to api to be stored
          this.http.post('https://localhost:44324/api/File/uploadSupplierOrderInvoice', formData).subscribe();
          
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
                  supplierOrderId: this.selectedorder.supplierOrderId,
                  supplierId : this.selectedSupplier,
                  description: this.supplierorderform.get('description')?.value,
                  supplierInvoice: fileToUpload.name
                }
                this.ventrixdbservice.updateSupplierOrder(this.order).subscribe();

                this.router.navigate(['/read-supplierorder']).then(() => {
                window.location.reload();
              })
            }
          })

          this.clicked = true;
        }
      })
    
  }


  get f() { return this.supplierorderform.controls!; }

  //When Cancel button clicked returns to Read Supplier screen
  returnDataTable()
  {
    this.router.navigate(['/read-supplierorder']);
    if (this.filename != '')
    {
      this.ventrixdbservice.deleteSupplierOrderInvoice(this.filename).subscribe();
    }
  }

  editSupplierOrderLine()
  {
    this.router.navigate(['/update-supplierorderline']);
  }

  editSupplierOrder()
  {
    this.submitted = true;
    this.ventrixdbservice.readSupplierOrder()
    .subscribe(response => {
      this.orders = response;

      this.orders.forEach(element => {
        console.log(element.description.toLowerCase())
        console.log(this.supplierorderform.get('description')?.value.toLowerCase())
        if (this.found == false && element.description.toLowerCase() == this.supplierorderform.get('description')?.value.toLowerCase() && element.supplierOrderId != this.selectedorder.supplierOrderId)
        {
          this.found = true;
        }
      });
      if (this.supplierorderform.valid)
      {
      //No duplicate description fro supplier order
      if(this.found == true)
      {
        Swal.fire({
          icon: 'warning',
          title: 'Duplicate Supplier Order Description',
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
        supplierOrderId: this.selectedorder.supplierOrderId,
        supplierId : this.selectedSupplier,
        description: this.supplierorderform.get('description')?.value,
        supplierInvoice: this.selectedorder.supplierInvoice
      }
      console.log(this.order)
      this.ventrixdbservice.updateSupplierOrder(this.order).subscribe();
      Swal.fire({
        icon: 'success',
        title: 'Supplier Order Successfully Updated',
        confirmButtonText: 'OK',
        confirmButtonColor: '#077bff',
        allowOutsideClick: false,
        allowEscapeKey: false
     }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['read-supplierorder']).then(() => {
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
