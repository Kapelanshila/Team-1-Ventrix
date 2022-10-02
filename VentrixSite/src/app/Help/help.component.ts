import { Component, OnInit, ViewChild } from '@angular/core';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/shared/User';
import { Router } from '@angular/router';
//Make sure swal is imported
import Swal from 'sweetalert2';
import { UserVM } from 'src/app/shared/UserVM';
import { Employee } from 'src/app/shared/Employee';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
  query:string = '';
  pdfSrc = "assets/Help.pdf";
  constructor() { }
  
  @ViewChild(PdfViewerComponent)
  private pdfComponent!: PdfViewerComponent;

  ngOnInit(): void {
  }

  searchPDF()
  {
    this.pdfComponent.eventBus.dispatch('find', {
      query: this.query, type: 'again', caseSensitive: false, findPrevious: undefined, highlightAll: true, phraseSearch: true
    });
  }

}
