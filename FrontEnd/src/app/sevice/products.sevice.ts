import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/products';




@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3006/product/list';
  private updateUrl = 'http://localhost:3006/users/update';
  private Url = 'http://localhost:3006/users/list';
  private detailUrl = 'http://localhost:3006/users/detail';
  private menuUrl = 'http://localhost:3006/menu/list';
  private menu2Url = 'http://localhost:3006/menu2/list';
  private editMENUURl = 'http://localhost:3006/menu/update';
  private ProductURL = 'http://localhost:3006/product/list';
  private ProductUpdateURL = 'http://localhost:3006/product/update';
  private genderURL = 'http://localhost:3006/gender/list';
  private categoryURL = 'http://localhost:3006/category/list';
  private seasonURL = 'http://localhost:3006/season/list';
 
  product: any;
  constructor(private httpClient: HttpClient) { }
  getgender(): Observable<any> {
    return this.httpClient.get<any[]>(this.genderURL);
  }
  getIdGender(id: string): Observable<any> {
    return this.httpClient.get(`${this.genderURL}/${id}`);
  }
  //
  getCategory(): Observable<any> {
    return this.httpClient.get<any[]>(this.categoryURL);
  }
  getIdCategory(id: string): Observable<any> {
    return this.httpClient.get(`${this.categoryURL}/${id}`);
  }
  //
  getSeason(): Observable<any> {
    return this.httpClient.get<any[]>(this.seasonURL);
  }
  getIdSeason(id: string): Observable<any> {
    return this.httpClient.get(`${this.seasonURL}/${id}`);
  }


  //PRODUCTTEAM
  //DISPLAY
  getAllAcc(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'token': `Bearer ${token}`
    });
    return this.httpClient.get<any[]>(this.Url, { headers });
  }
  getMenu(): Observable<any> {
    return this.httpClient.get<any[]>(this.menuUrl);
  }
  getMenu2(): Observable<any> {
    return this.httpClient.get<any[]>(this.menu2Url);
  }
  getMenuu(id: string): Observable<any> {
    return this.httpClient.get(`${this. menuUrl}/${id}`);
  }
  getDetailAcc(id: number): Observable<any> {
    return this.httpClient.get(`${this.detailUrl}/${id}`);
  }
  getDetailProduct(id: number): Observable<any> {
    return this.httpClient.get(`${this.ProductURL}/${id}`);
  }
  getAccUser(id: number){
    return this.httpClient.get( `${this.detailUrl}/${id}`);
  }

//DELETE
  DeleteAcc(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'token': `Bearer ${token}`
    });
    const url = `http://localhost:3006/users/delete/${id}`;
    return this.httpClient.delete<any>(url, { headers });
  }
  DeleteMenu(id: string): Observable<any> {
    const url = `http://localhost:3006/menu/delete/${id}`;
    return this.httpClient.delete<any>(url);
  }
  DeleteProduct(id: number): Observable<any> {
    const url = `http://localhost:3006/product/delete/${id}`;
    return this.httpClient.delete<any>(url,);
  }


//EDIT
  EditMenu( id: number,data: any): Observable<any> {
    return this.httpClient.put(`${this.editMENUURl}`, data);
  }


//UPDATE
  updateAcc( id: number,data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'token': `Bearer ${token}`
    });
    return this.httpClient.put(`${this.updateUrl}`, data, { headers });
  }
  updateProduct( id: number,data: any): Observable<any> {
    return this.httpClient.put(`${this.ProductUpdateURL}`, data);
  }
  uploadImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    // Gửi request tải lên tệp hình ảnh
    this.httpClient.post('http://localhost:3006/product/add', formData).subscribe((response: any) => {
      if (response.success) {
        // Lấy URL của hình ảnh đã tải lên thành công
        const imageUrl = response.imageUrl;
        this.product.image_product = imageUrl;
      }
    });
  }


  //PRODUCT
  getProducts(): Observable<any[]> {//list sản phẩm
    return this.httpClient.get<any[]>(this.apiUrl);
  }
  getDetailproduct(id: number){
    return this.httpClient.get( `${this.apiUrl}/${id}`);
  }
  searchData(query: string): Observable<any> {// tìm kiếm
    const url = `http://localhost:3006/product/search?q=${query}`;
    return this.httpClient.get<any>(url);
  }

  editproduct(id : number, data: any){// sửa
    return this.httpClient.put(`${this.apiUrl}/${id}`,data)
  }


  //LOGIN
  login(data: any) : Observable<any>{ // đăng nhập
    const url = "http://localhost:3006/";
    return this.httpClient.post(url + 'account/create', data); // vi login ve kia ta tao la "app.post()"
  }


  // CART
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







