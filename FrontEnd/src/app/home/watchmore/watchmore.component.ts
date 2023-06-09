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

  // images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  product: Product | null = null;
  
  images: any = {};
  productList: any [] = [];
  imageList: any [] = [];
  productID: any [] = [];
  productImages: any [] = [];
  manWomanProducts: any [] = [];
  accessories: any [] = [];


	constructor(private offcanvasService: NgbOffcanvas, private watchMoreService: WatchMoreService, 
    private renderer: Renderer2,private route: ActivatedRoute, private productService : ProductService,
    private router: Router) {}

	openEnd(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { position: 'end' });
	}

  ngOnInit() {
    // this.watchMoreService.get1Product('9004').subscribe(
    //   response => {
    //     this.product = response.result;
    //       this.images = JSON.parse(response.result.image_product)
    //       this.firstImage = this.images[0];
    //       console.log("đây là ảnh sp: " ,this.images)
    //   }
    // )

    // this.productService.getDetail('9004').subscribe(
    //   res => {
    //     this.product = res.result;
    //     this.productTitle = res.result.title_product;
    //   }
    // )
    // this.productService.getDetail('9004').subscribe(
    //   res => {
    //     this.product = res.result;
    //     this.productName = res.result.name_product;
    //   }
    // )

    // this.watchMoreService.getAllProduct().subscribe(
    //   res => {
    //     this.productList = res.result;
    //     console.log("đây là productlist: ", this.productList)
    //     // console.log("ID sp1: ", this.productList[1].id_product )
    //     this.productList.forEach( proID => {
    //       this.productID.push(proID.id_product);
    //       // console.log("đây là productID: ", this.productID);
    //     });
        
    //     this.productList.forEach(proTitle => {
    //       this.productTitle.push(proTitle.title_product)
    //       // console.log("đây là productTitle: ", this.productTitle);
    //     });
    //     this.productList.forEach(proImage => {         
    //       this.productImages.push(proImage.image_product);
    //       // console.log("đây là productImage: ", this.productImages);
    //       const extractedImages: string[] = []; //tạo một mảng extractedImages để chứa các đường link hình ảnh trước khi thêm vào this.productImages
    //       this.productImages.forEach((imageString: string) => {
    //         const abc: string[] = JSON.parse(imageString);
    //         extractedImages.push(...abc);             
    //         console.log("Các đường link hình ảnh sản phẩm:", this.productImages);           
    //       })

    //     });
    //   }
    // )
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
  

    this.watchMoreService.getAllProduct().subscribe((res) => {
      this.productList = res.result;
      this.productList.forEach((product) => {
        this.productID.push(product.id_product);
        this.manWomanProducts = this.productList.filter((product) => product.id_menu === 'e2'); 
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
  navigateToDetail(productId: string) {
    this.watchMoreService.getProductById(productId).subscribe(
      (res) => {
        const product: Product = res.result; // Lấy thông tin sản phẩm từ kết quả trả về
        this.router.navigate(['/detail', product.id_product]);
      },
      (error) => {
        console.error('Failed to load product details', error);
        // Xử lý lỗi tại đây (ví dụ: thông báo lỗi, chuyển hướng sang trang lỗi, vv.)
      }
    );
  }
  
}

