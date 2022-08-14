import { Component, OnInit } from '@angular/core';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { LoadingHandler } from '../_helpers/loading-handler';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-backup-restore',
  templateUrl: './backup-restore.component.html',
  styleUrls: ['./backup-restore.component.css']
})
export class BackupRestoreComponent implements OnInit {
  constructor(public ventrixdbservice: VentrixDBServiceService, private http:HttpClient) { }
  loading = false;  
  loadinghandler = new LoadingHandler();
  x:any;
  ngOnInit(): void {
  }

  backupDrive()
  {
    Swal.fire({
      icon: 'question',
      title: 'Are you sure you want backup system files?',
      text:'Eg. Client Invoices, Supplier Invoices, Asset Images etc.',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      confirmButtonColor: '#077bff',
      allowOutsideClick: false,
      allowEscapeKey: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        this.ventrixdbservice.backupDrive().subscribe(response => {
          this.loading = false;
          Swal.fire({
            icon: 'success',
            title: 'System Files Backed Up',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#077bff',
            allowOutsideClick: false,
            allowEscapeKey: false
          })
        })
      }
    })  
  }

  backupDatabase()
  {
    Swal.fire({
      icon: 'question',
      title: 'Are you sure you want to backup the database?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      confirmButtonColor: '#077bff',
      allowOutsideClick: false,
      allowEscapeKey: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.ventrixdbservice.backupDatabase().subscribe(response => {
          Swal.fire({
            icon: 'success',
            title: 'Database Backed Up',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#077bff',
            allowOutsideClick: false,
            allowEscapeKey: false
          })
        })
      }
    })  
  }

  restoreDatabase()
  {
    Swal.fire({
      icon: 'question',
      title: 'Are you sure you want to restore the database?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      confirmButtonColor: '#077bff',
      allowOutsideClick: false,
      allowEscapeKey: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.ventrixdbservice.restoreDatabase().subscribe(response => {
          Swal.fire({
            icon: 'success',
            title: 'Database Restored',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#077bff',
            allowOutsideClick: false,
            allowEscapeKey: false
          })
        })
      }
    })  
  }

}
