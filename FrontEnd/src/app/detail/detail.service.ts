import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class ProductService {
    constructor(
        public httpClient: HttpClient,
      ) { }
      getDetail(params: string): Observable<any> {
        const url = 'http://localhost:3006/product/list/' + params;        
        return this.httpClient.get(url);
      }
      
  }