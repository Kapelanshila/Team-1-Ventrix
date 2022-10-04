/* eslint-disable @typescript-eslint/member-ordering */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import SignaturePad from 'signature_pad';
import { CollectedOrderVM } from 'src/app/shared/CollectedOrderVM';
import { DeliveriesService } from '../_services/deliveries.service';


@Component({
  selector: 'app-complete-order',
  templateUrl: './complete-order.page.html',
  styleUrls: ['./complete-order.page.scss'],
})
export class CompleteOrderPage implements OnInit {
  isHelp: boolean;
  response:CollectedOrderVM;
  id: number;
  clientId: number;

  title = 'signatureJS';
  signaturePad: SignaturePad;
  @ViewChild('canvas') canvasEl: ElementRef;
  signatureImg: string;

  constructor(
    private deliveryService: DeliveriesService,
    public toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = Number(this.activatedRoute.snapshot.params.orderId);

    this.clientId = Number(this.activatedRoute.snapshot.params.clientId);
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngAfterViewInit() {
    this.signaturePad = new SignaturePad(this.canvasEl?.nativeElement);
  }

  startDrawing(event: Event) {
    // works in device not in browser
  }

  moved(event: Event) {
    // works in device not in browser
  }

  clearPad() {
    this.signaturePad.clear();
    this.signatureImg = undefined;
  }

  savePad() {
    const base64Data = this.signaturePad.toDataURL();
    this.signatureImg = base64Data;
  }

  async signatureAlert() {
    let toast;
      toast = await this.toastController.create({
        message: 'Signature not saved',
        color: 'danger',
        duration: 2000,
      });

    toast.present();
  }

  async completeOrder() {
    this.response = 
    {
      orderId: this.id,
      signature: this.signatureImg
    }
    
    if (this.signatureImg == undefined)
    {
      this.signatureAlert();
    }
    else
    {
      const alert = await this.alertController.create({
        header: 'Are you you want to complete this order?',
        cssClass: 'secondary',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            handler: () => {
              ' this.handlerMessage';
            },
          },
          {
            text: 'Yes',
            role: 'confirm',
            handler: () => {
              this.deliveryService
                .completeDelivery(this.response)
                .subscribe((data) => {
                  this.router.navigate(['/deliveries']).then(() => {
                    window.location.reload();
                  });
                });
            },
          },
        ],
      });
  
      await alert.present();

    }

  }
}
