import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { VentrixDBServiceService } from 'src/app/auth/services/ventrix-db-service.service';
import { Account } from 'src/app/shared/Account';
import { CollectVM } from 'src/app/shared/CollectVM';
import { CollectionsService } from '../_services/collections.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.page.html',
  styleUrls: ['./collection.page.scss'],
})
export class CollectionPage implements OnInit {
  order:CollectVM;
  account:Account;
  public collections = new Array<any>();
  constructor(private collectionService: CollectionsService, public toastController: ToastController, private ventrixdbserviceservice:VentrixDBServiceService) { }

  ngOnInit() {
    this.getCollections();
  }

  //get collections from the database
  getCollections() {
    this.collectionService.getOrderCollections().subscribe(
      (data: any) => {
        this.collections = data;
        console.log(data);
      }
    );
  }

  //Collect order
  collectOrder(clientOrderId: number) {
    this.account = this.ventrixdbserviceservice.getAccount();

    this.order = 
    {
      clientOrderId:clientOrderId,
      employeeId: this.account.employeeId
    }
    this.collectionService.collectOrder(this.order).subscribe(
      (data: any) => {
        this.collections = data;
        this.successfulOrderCollection(true);

      },
      (error: any) => {
        this.successfulOrderCollection(false);
      }
    );
  }

  refresh()
  {
    window.location.reload();
  }

  async successfulOrderCollection(isSuccess) {
    let toast;
    if (isSuccess) {
       toast = await this.toastController.create({
        message: 'Order Collected',
        color: 'success',
        duration: 2000
      });
    }
    else {
       toast = await this.toastController.create({
        message: 'Error in collection.',
        color: 'danger',
        duration: 2000
      });
    }

    toast.present();
  }

}
