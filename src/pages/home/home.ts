import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AppService, StockAxisData } from '../../app/app.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  public stockData: StockAxisData[];
  public stockDate: Date;

  constructor(public navCtrl: NavController, private _appService: AppService) { }

  ngOnInit() {
    this._appService.getStockData().then(
      response => {
        console.log(response);
        this.stockData = response;
        this.stockDate = this.stockData[0].Date;
      }
    )
  }

}
