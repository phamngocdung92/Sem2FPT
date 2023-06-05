import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class WatchMoreService {
    constructor(
        public httpClient: HttpClient,
      ) { }
      get1Product(params: string): Observable<any> {
        const url = 'http://localhost:3006/product/list/' + params;        
        return this.httpClient.get(url);
      }

      getAllProduct(): Observable<any>{
        const url = 'http://localhost:3006/product/list';
        return this.httpClient.get(url);
      }
      
  }