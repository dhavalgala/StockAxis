import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AppService {

    private headers = new Headers({ 'Accept': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });

    constructor(private http: Http) { }

    getStockData(): Promise<StockAxisData[]> {
        return this.http.get("https://stockaxis.com/Webservices/android/index.aspx?action=view&activity=changeintrend&cid=187166", this.options)
            .toPromise()
            .then(response => {
                let xyz = response['_body'];
                xyz = xyz.split(/<\/?[^>]+>/gi).join('');
                return JSON.parse(xyz).data;
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only 
        return Promise.reject(error.message || error);
    }
}

export class StockAxisData {
    ShortCode: string;
    Fincode: number;
    Date: Date;
    ClosingPrice: number;
    LongTrend: string;
    Rating: number;
    COMPNAME: string;
    IND_CODE: number;
    FavStock: number;
}