import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { VentrixDBServiceService } from '../services/ventrix-db-service.service';
import { Account } from '../shared/Account';
import { Client } from '../shared/Client';
import { ClientOrder } from '../shared/ClientOrder';
import { ClientOrderStatus } from '../shared/ClientOrderStatus';
import { ClientOrderVM } from '../shared/ClientOrderVM';
import { InventoryPopup } from '../shared/InventoryPopUp';

@Component({
  selector: 'app-orderinfo',
  templateUrl: './orderinfo.component.html',
  styleUrls: ['./orderinfo.component.css']
})
export class OrderinfoComponent implements OnInit {
  data: any;
  id!:any;
  account!:Account;
  plainText!:string;  
  encryptText!: string;  
  encPassword!: string;  
  decPassword!:string;  
  conversionEncryptOutput!: string;  
  conversionDecryptOutput!:string;  
  clientOrders:ClientOrder[] = [];
  completed:ClientOrderVM[] = [];
  clientOrderVM:ClientOrderVM[] = [];
  temp!:ClientOrderStatus;
  clientOrdersStatuses:ClientOrderStatus[] = [];
  clients:Client[] = [];
  client:Client|undefined;
  orderstatus!:ClientOrderVM;
  statuses: ClientOrderStatus[] = [];
  inventories: any[] =[];
  item!: InventoryPopup;
  clientorderlines: any[] = [];
  orders: any[] = [];
  filterOrder:ClientOrderVM[] = [];
  status: string = "";
  readstatuses: any[] = [];
  constructor(private route:ActivatedRoute,private ventrixdbservice:VentrixDBServiceService) { }
  order!:any;

  ngOnInit(): void {
    this.ventrixdbservice.clearClientOrder();
    this.ventrixdbservice.readClientOrder()
    .subscribe(response => {

      this.route.queryParams.subscribe(params => {
        this.data = params['order'];
      });
  
      //Decrypt the ID 
      this.data = this.data.toString().replaceAll(" ", "+"); 
   
      this.id = CryptoJS.AES.decrypt(this.data.trim(), "coffee".trim()).toString(CryptoJS.enc.Utf8);  

      this.clientOrders = response;
      this.order = this.clientOrders.find(x => x.description == this.id);
      console.log(this.order)
      this.ventrixdbservice.readClientOrderStatuses()
      .subscribe(response => {
        //Uses earliest date of status to get current status
        this.statuses = [];
        response.forEach(element => {
          if (element.clientOrderId == this.order.clientOrderId && element.description != "Added")
          {
            this.statuses.push(element)
          }
        });
      })   
  })
}
}
