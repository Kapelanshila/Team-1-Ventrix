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
import { SupplierOrderVM } from 'src/app/shared/SupplierOrderVM';
// import { ThemeService } from 'ng2-charts';

@Component({
  selector: 'app-create-supplier-order',
  templateUrl: './create-supplier-order.component.html',
  styleUrls: ['./create-supplier-order.component.css']
})
export class CreateSupplierOrderComponent implements OnInit {

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
  setorder!:SupplierOrderVM;
  disabled = false;

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
    this.disabled = false;
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

        if (this.supplierorder != undefined)
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
          this.http.post('https://localhost:44324/api/File/uploadSupplierOrderInvoice', formData).subscribe();
    
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

  addSupplierOrder()
  {
    this.submitted = true;
    this.ventrixdbservice.readSupplierOrder()
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
    
    //No duplicate description fro supplier order
    if(this.orders.find(x => x.description.toLowerCase() == this.supplierorderform.get('description')?.value.toLowerCase()) != undefined )
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

    if (this.supplierorderform.valid && this.filename != '' && this.disabled == false && this.orders.find(x => x.description.toLowerCase() == this.supplierorderform.get('description')?.value.toLowerCase()) == undefined )
    {
     
      this.order =
      {
        supplierOrderId: 0,
        supplierId : this.selectedSupplier,
        description: this.supplierorderform.get('description')?.value,
        supplierInvoice: this.filename
      }
   
      Swal.fire({
        icon: 'success',
        title: 'Supplier Order Successfully Added',
        confirmButtonText: 'OK',
        confirmButtonColor: '#077bff',
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then((result) => {
        if (result.isConfirmed) {
          this.ventrixdbservice.createSupplierOrder(this.order).subscribe();
          this.setorder =
          {
            contactPersonName:'',
            description:this.order.description,
            emailAddress:'',
            inventories:false,
            supplierId:this.order.supplierId,
            supplierInvoice:this.order.supplierInvoice,
            supplierOrderId:this.order.supplierOrderId
          }
          this.ventrixdbservice.setSupplierOrder(this.setorder);
          this.router.navigate(['/read-supplierorderline']).then(() => {
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
