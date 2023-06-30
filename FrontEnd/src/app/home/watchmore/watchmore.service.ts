import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class WatchMoreService {
    private menu2productURL = 'http://localhost:3006/menuProduct2/list';
    constructor(
        public httpClient: HttpClient,
      ) { }
      getProductById(productId: string): Observable<any> {
        const url = 'http://localhost:3006/product/list/' + productId;
        return this.httpClient.get(url);
      }
      getWatchmore(id: string): Observable<any> {
        return this.httpClient.get(`${this.menu2productURL}/${id}`);
      }

      getAllProduct(): Observable<any>{
        const url = 'http://localhost:3006/product/list';
        return this.httpClient.get(url);
      }
      getAllMenu(): Observable<any>{
        const url = 'http://localhost:3006/menu/list';
        return this.httpClient.get(url)
      }
      getAllMenu2(): Observable<any>{
        const url = 'http://localhost:3006/menu2/list';
        return this.httpClient.get(url)
      }

  }
