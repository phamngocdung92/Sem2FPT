import { HttpClient } from '@angular/common/http';
import { Component, Input,ElementRef, OnInit, TemplateRef } from '@angular/core';
import { ProductService } from '../sevice/products.sevice';

import { ActivatedRoute, Router } from '@angular/router';
import { Check1Component } from '../home/check1/check1.component';
import {  query } from 'express';
import { Query } from 'mongoose';
import { NgbCarouselConfig, NgbCarouselModule,NgbOffcanvasConfig, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../model/products';

// ...
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css','../home/check1/check1.component.css'],
  providers: [NgbOffcanvasConfig, NgbOffcanvas],
})
export class SearchComponent {
   images: any = {};
  searchQuery!: string;

  
  productList: any [] = [];
   productImages: any [] = [];

  constructor(private http: HttpClient,private searchService: ProductService,private activatedRoute : ActivatedRoute,private offcanvasService: NgbOffcanvas,private router: Router) {}

  // searchData(): void {
  //   // Gửi yêu cầu tìm kiếm dữ liệu
  //   this.http.get(http://localhost:3000/Product?q=${this.searchQuery})

  //     .subscribe(

  //       (response: any) => {
  //         // Xử lý dữ liệu tìm kiếm thành công
  //         this.searchResults = response as any[]; // Chuyển đổi kiểu dữ liệu thành mảng any[]
  //         console.log('Dữ liệu tìm kiếm:', this.searchResults);
  //       },
  //       (error) => {
  //         // Xử lý lỗi khi tìm kiếm dữ liệu
  //         console.error('Lỗi tìm kiếm dữ liệu:', error);
  //       }
  //     );
  // }
  
	

	openEnd(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { position: 'end' });
	};
  firstImage(images: string[]): string {
    if (images && images.length > 0) {
      return images[0]; // Trả về ảnh đầu tiên trong danh sách
    }
    return ''; // Trả về chuỗi rỗng nếu danh sách ảnh trống
  }
  navigateToDetail(productId: number) {
    this.searchService.getDetailProduct(productId).subscribe(
      (res) => {
        const product: Product = res.result; // Lấy thông tin sản phẩm từ kết quả trả về
        const url = '/detail/' + product.id_product;
        this.router.navigateByUrl(url)
      },
      (error) => {
        console.error('Failed to load product details', error);
        // Xử lý lỗi tại đây (ví dụ: thông báo lỗi, chuyển hướng sang trang lỗi, vv.)
      }
    );
  }
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(query => {
      console.log(query['q']);
      this.searchService.searchData(query['q']).subscribe
      (
        (data) => {
          // Xử lý dữ liệu tìm kiếm thành công
          this.productList = data.result ; // Chuyển đổi kiểu dữ liệu thành mảng any[]
          console.log('Dữ liệu tìm kiếm:', this.productList);
          this.productList.forEach((product) => {
           
            
    
            //thay thế 'e2' trong product.id_menu === 'e2' bằng các id_menu tương ứng và kiểm tra khớp trong html
            const images = JSON.parse(product.image_product!);
            this.productImages.push(images);
            product.images = images;
            // Gán giá trị vào product.images
            
          });
        },
        (error) => {
          // Xử lý lỗi khi tìm kiếm dữ liệu
          console.error('Lỗi tìm kiếm dữ liệu:', error);
        }
      )
    })
  }

}

  // searchDat(query: string): void {
  //   this.searchService.searchDat(query).subscribe(
  //     (results: Product[]) => {
  //       this.searchResults = results;
  //     },
  //     (error: any) => {
  //       console.error('Error searching data:', error);
  //     }
  //   );
  // }