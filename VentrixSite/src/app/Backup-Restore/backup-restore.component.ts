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
    this.loading = true;
    this.ventrixdbservice.backupDrive().subscribe(response => {
      this.loading = false;
    })

  }

  backupDatabase()
  {
    this.ventrixdbservice.backupDatabase().subscribe(response => {
    })
  }

  restoreDatabase()
  {
    this.ventrixdbservice.restoreDatabase().subscribe(response => {
    })

  }

}
