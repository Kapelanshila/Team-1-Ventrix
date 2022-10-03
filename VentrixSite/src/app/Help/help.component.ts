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
  page!: number;
  test = 1;

  pageinput = 1;
  constructor(private ventrixdbservice:VentrixDBServiceService, private router: Router) 
  { }
  
  @ViewChild(PdfViewerComponent)
  private pdfComponent!: PdfViewerComponent;

  ngOnInit(): void 
  {
    this.page = this.ventrixdbservice.getPage();
    this.pageinput = this.ventrixdbservice.getPage();
  }

  pagechange()
  {
    this.page = this.pageinput;
  }

  next()
  {
    this.page++;
  }

  previous()
  {
    this.page--;
  }
 
  pageRendered(e: any) {
    this.page = e;
  }

  searchPDF()
  {
    if(this.query == "")
    {
      this.page = 1;
    }
    else
    {
      this.pdfComponent.eventBus.dispatch('find', {
        query: this.query, type: 'again', caseSensitive: false, findPrevious: undefined, highlightAll: true, phraseSearch: true
      });
    }
  }

}
