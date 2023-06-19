import { Component,TemplateRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NgbCarouselConfig, NgbCarouselModule,NgbOffcanvasConfig, NgbOffcanvas, NgbSlideEvent, NgbSlideEventSource, NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { WatchMoreService } from './watchmore.service';
import { Product } from 'src/app/model/products';
import { ProductService } from 'src/app/detail/detail.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-watchmore',
  templateUrl: './watchmore.component.html',
  styleUrls: ['./watchmore.component.css'],

  providers: [NgbOffcanvasConfig, NgbOffcanvas,NgbCarouselConfig],
})

export class watchmoreComponent implements OnInit {
  @ViewChild('carousel', { static: true }) carousel?: NgbCarousel;


  product: Product | null = null;
  
  images: any = {};
  productList: any [] = [];
  imageList: any [] = [];
  productID: any [] = [];
  productImages: any [] = [];
  accessories: any [] = [];
  menuList: any [] = [];
  newCollection: any [] = [];
  manProducts: any [] = [];
  WomanProducts: any [] = [];
  menuImages: Map<string, string> = new Map<string, string>();
  menuName: Map<string, string> = new Map<string, string>();

  visibleNewCollection: any[] = [];
  visibleManProducts: any[] = [];
  visibleWomanProducts: any[] = [];
currentPage: number = 1;
itemsPerPage: number = 4;
  // totalItems: number = 0;


	constructor(private offcanvasService: NgbOffcanvas, private watchMoreService: WatchMoreService, 
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
  
 // for products
    this.watchMoreService.getAllProduct().subscribe((res) => {
      this.productList = res.result;
      this.productList.forEach((product) => {
        this.updateVisibleProducts();
        // this.productID.push(product.id_product);
        this.newCollection = this.productList.filter((nC) => nC.id_menu === 'e1'); //e1
        this.manProducts = this.productList.filter((mP) => mP.id_gender === 'c1'); //e5
        this.WomanProducts = this.productList.filter((wP) => wP.id_gender === 'c2'); //e6
        

        //thay thế 'e2' trong product.id_menu === 'e2' bằng các id_menu tương ứng và kiểm tra khớp trong html
        const images = JSON.parse(product.image_product);
        this.productImages.push(images);
        product.images = images; // Gán giá trị vào product.images
        
      });
      console.log("proIm:", this.productImages)
      console.log("newC: ", this.newCollection);
      console.log("nam: ", this.manProducts);
      console.log("nữ: ", this.WomanProducts)
    });

// for menus
    this.watchMoreService.getAllMenu().subscribe((res) => {
      this.menuList = res.result;
      console.log("menuList: ", this.menuList)
      this.menuList.forEach((menu) => {
        this.menuImages.set(menu.id_menu, menu.image_b);
        this.menuName.set(menu.id_menu, menu.name_menu)
      });
      console.log("menuImages: ", this.menuImages);
    });    
  }
  firstImage(images: string[]): string {
    if (images && images.length > 0) {
      return images[0]; // Trả về ảnh đầu tiên trong danh sách
    }
    return ''; // Trả về chuỗi rỗng nếu danh sách ảnh trống
  }
  navigateToDetail(productId: string) {
    this.watchMoreService.getProductById(productId).subscribe(
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
    return Math.ceil(this.newCollection.length / this.itemsPerPage);
    // return Math.ceil(this.manProducts.length / this.itemsPerPage);
    // return Math.ceil(this.WomanProducts.length / this.itemsPerPage);
  }
  
  updateVisibleProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.visibleNewCollection = this.newCollection.slice(startIndex, endIndex);
    this.visibleManProducts = this.manProducts.slice(startIndex, endIndex);
    this.visibleWomanProducts = this.WomanProducts.slice(startIndex, endIndex);
  }
    //các sản phẩm tiếp theo trong trang
    prevPage1() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.updateVisibleProducts();
      }
    }
    
    nextPage1() {
      if (this.currentPage < this.totalPages()) {
        this.currentPage++;
        this.updateVisibleProducts();
      }
    }
    
    totalPages1() {
      // return Math.ceil(this.newCollection.length / this.itemsPerPage);
      return Math.ceil(this.manProducts.length / this.itemsPerPage);
      // return Math.ceil(this.WomanProducts.length / this.itemsPerPage);
    }
      //các sản phẩm tiếp theo trong trang
  prevPage2() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateVisibleProducts();
    }
  }
  
  nextPage2() {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
      this.updateVisibleProducts();
    }
  }
  
  totalPages2() {
    // return Math.ceil(this.newCollection.length / this.itemsPerPage);
    // return Math.ceil(this.manProducts.length / this.itemsPerPage);
    return Math.ceil(this.WomanProducts.length / this.itemsPerPage);
  }

  //testing

  


}

