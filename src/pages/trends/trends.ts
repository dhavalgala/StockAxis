import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { AppService, StockAxisData } from '../../app/app.service';

@Component({
  selector: 'page-trends',
  templateUrl: 'trends.html'
})
export class TrendsPage implements OnInit {

  public stockData: StockAxisData[] = [];
  public stockDate: Date;

  constructor(public navCtrl: NavController, private _appService: AppService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    this._appService.getStockData().then(
      response => {
        console.log(response);
        for (let i = 0; i < response.length; i++) {
          this.stockData.push(response[i]);
        }
        // this.stockData = response;
        this.stockDate = this.stockData[0].Date;
        loading.dismiss();
      }
    )
  }
}
