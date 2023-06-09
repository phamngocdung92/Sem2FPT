import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/products';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/Product'; // Đường dẫn API
  private Url = 'http://localhost:3006/users/list';

  
  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<any[]> {//list sản phẩm 
    return this.httpClient.get<any[]>(this.apiUrl);
  }
  getProduct(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'token': `Bearer ${token}`
    });
  
    return this.httpClient.get<any[]>(this.Url, { headers });
  }
  DeleteAcc(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'token': `Bearer ${token}`
    });
  
    const url = `http://localhost:3006/users/delete/${id}`;
  
    return this.httpClient.delete<any>(url, { headers });
  }
  
  searchData(query: string): Observable<any> {// tìm kiếm 
    const url = `http://localhost:3000/Product?q=${query}`;
    return this.httpClient.get<any>(url);
  }
  getDetailproduct(id: number){// sửa
    return this.httpClient.get( `${this.apiUrl}/${id}`)
  }
  editproduct(id : number, data: any){// sửa
    return this.httpClient.put(`${this.apiUrl}/${id}`,data)
  }
  login(data: any) : Observable<any>{ // đăng nhập 
    const url = "http://localhost:3006/";
    return this.httpClient.post(url + 'account/create', data); // vi login ve kia ta tao la "app.post()"
  }
  getCarts ( ) {
    let cartJson = sessionStorage.getItem('cart');
    if ( cartJson) {
      return JSON.parse(cartJson);
    }
    else{
      return [] ;
    }
  }
  saveCart(carts:any){
    let cartJson = JSON.stringify(carts);
    sessionStorage.setItem('cart',cartJson)
  } 
  
  }


