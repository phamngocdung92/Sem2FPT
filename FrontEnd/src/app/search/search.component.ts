import { HttpClient } from '@angular/common/http';
import { Component, Input,ElementRef, OnInit, TemplateRef } from '@angular/core';
import { ProductService } from '../sevice/products.sevice';
import { Product } from '../model/products';
import { ActivatedRoute } from '@angular/router';
import { query } from 'express';
import { Query } from 'mongoose';
import { NgbCarouselConfig, NgbCarouselModule,NgbOffcanvasConfig, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

// ...
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css','../home/check1/check1.component.css'],
  providers: [NgbOffcanvasConfig, NgbOffcanvas],
})
export class SearchComponent {
  
  searchQuery!: string;
  searchResults: Product[] = [];
  products: Object = [];

  constructor(private http: HttpClient,private searchService: ProductService,private activatedRoute : ActivatedRoute,private offcanvasService: NgbOffcanvas) {}

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
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

	

	openEnd(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { position: 'end' });
	};

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(query => {
      console.log(query['q']);
      this.searchService.searchData(query['q']).subscribe
      (
        (data) => {
          // Xử lý dữ liệu tìm kiếm thành công
          this.searchResults = data ; // Chuyển đổi kiểu dữ liệu thành mảng any[]
          console.log('Dữ liệu tìm kiếm:', this.searchResults);
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