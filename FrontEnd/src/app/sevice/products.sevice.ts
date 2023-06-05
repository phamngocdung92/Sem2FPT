import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/products';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/Product'; // Đường dẫn API

  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiUrl);
  }
  searchData(query: string): Observable<any> {
    const url = `http://localhost:3000/Product?q=${query}`;
    return this.httpClient.get<any>(url);
  }
  getDetailproduct(id: number){
    return this.httpClient.get( `${this.apiUrl}/${id}`)
  }
  editproduct(id : number, data: any){
    return this.httpClient.put(`${this.apiUrl}/${id}`,data)
  }
  login(data: any) : Observable<any>{ // return gia tri la Observable<any>
    const url = "http://localhost:3006/";
    return this.httpClient.post(url + 'account/create', data); // vi login ve kia ta tao la "app.post()"
  }

  }


