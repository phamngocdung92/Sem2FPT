import { Component,TemplateRef, OnInit, Renderer2, HostListener, ElementRef, ViewChild } from '@angular/core';
import { NgbCarouselConfig, NgbCarouselModule,NgbOffcanvasConfig, NgbOffcanvas, NgbSlideEvent, NgbSlideEventSource, NgbCarousel } from '@ng-bootstrap/ng-bootstrap';

import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/sevice/products.sevice';
import { Product } from 'src/app/model/products';
// import { ProductService } from 'src/app/detail/detail.service';



@Component({
  selector: 'app-check1',
  templateUrl: './check1.component.html',
  styleUrls: ['./check1.component.css'],

  providers: [NgbOffcanvasConfig, NgbOffcanvas,NgbCarouselConfig],
})

export class Check1Component implements OnInit {
  @ViewChild('carousel', { static: true }) carousel?: NgbCarousel;
  @ViewChild('bodyDiv') bodyDiv: ElementRef | undefined;

  // images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  product: Product | null = null;
  
  images: any = {};
  productList: any [] = [];
  imageList: any [] = [];
  productID: any [] = [];
  productImages: any [] = [];
  springProducts: any [] = [];
  accessories: any [] = [];
  //
  visibleProducts: any[] = [];
currentPage: number = 1;
itemsPerPage: number = 4;
  totalItems: number = 0;


	constructor(private offcanvasService: NgbOffcanvas,  
    private renderer: Renderer2,private route: ActivatedRoute, private productService : ProductService,
    private router: Router) {}

	openEnd(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { position: 'end' });
	}

  ngOnInit() {  
    
    this.route.params.subscribe(params => {
      const productId = params['id']; // Lấy giá trị của id từ URL
      this.productService.getProductById(productId).subscribe(
        (res) => {
          this.product = res; // Gán thông tin sản phẩm vào biến product
        },
        (error) => {
          console.error('Failed to load product details', error);
          // Xử lý lỗi tại đây (ví dụ: thông báo lỗi, chuyển hướng sang trang lỗi, vv.)
        }
      );
    });
  

    this.productService.getAllProduct().subscribe((res) => {
      this.productList = res.result;
      this.productList.forEach((product) => {
        this.productID.push(product.id_product);
        this.updateVisibleProducts();
        this.springProducts = this.productList.filter((product) => product.id_season === 'd2'); 
        //thay thế 'e2' trong product.id_menu === 'e2' bằng các id_menu tương ứng và kiểm tra khớp trong html
        const images = JSON.parse(product.image_product);
        this.productImages.push(images);
        product.images = images; // Gán giá trị vào product.images
      });
    });
  }

  firstImage(images: string[]): string {
    if (images && images.length > 0) {
      return images[0]; // Trả về ảnh đầu tiên trong danh sách
    }
    return ''; // Trả về chuỗi rỗng nếu danh sách ảnh trống
  }
  //chuyển đến detail product được chọn
  navigateToDetail(productId: string) {
    this.productService.getProductById(productId).subscribe(
      (res) => {
        const product: Product = res.result; // Lấy thông tin sản phẩm từ kết quả trả về
        const url = '/detail/' + product.id_product;
      window.open(url, '_blank');
      },
      (error) => {
        console.error('Failed to load product details', error);
        // Xử lý lỗi tại đây (ví dụ: thông báo lỗi, chuyển hướng sang trang lỗi, vv.)
      }
    );
  }
//các sản phẩm tiếp theo trong trang
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateVisibleProducts();
    }
  }
  
  nextPage() {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
      this.updateVisibleProducts();
    }
  }
  
  totalPages() {
    return Math.ceil(this.springProducts.length / this.itemsPerPage);
  }
  
  updateVisibleProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.visibleProducts = this.springProducts.slice(startIndex, endIndex);
  }
  
}

