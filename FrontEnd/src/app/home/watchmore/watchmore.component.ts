import { Component,TemplateRef, OnInit, Renderer2,  } from '@angular/core';
import { NgbCarouselConfig, NgbCarouselModule,NgbOffcanvasConfig, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { WatchMoreService } from './watchmore.service';
import { Product } from 'src/app/model/products';
import { ProductService } from 'src/app/detail/detail.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-watchmore',
  templateUrl: './watchmore.component.html',
  styleUrls: ['./watchmore.component.css'],

  providers: [NgbOffcanvasConfig, NgbOffcanvas],
})

export class watchmoreComponent implements OnInit {

  // images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  product: Product | null = null;
  productTitle: any [] = [];
  productName: string | null = null;
  firstImage: string | null = null;
  images: any = {};
  productList: any [] = [];
  imageList: any [] = [];
  productID: any [] = [];
  productImages: any [] = [];


	constructor(private offcanvasService: NgbOffcanvas, private watchMoreService: WatchMoreService, private renderer: Renderer2,private route: ActivatedRoute, private productService : ProductService) {}

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

    this.watchMoreService.getAllProduct().subscribe((res) => {
      this.productList = res.result;
      this.productList.forEach((product) => {
        this.productID.push(product.id_product);
        this.productTitle.push(product.title_product);
        const images = JSON.parse(product.image_product);
        this.productImages.push(images);
        product.images = images; // Gán giá trị vào product.images
        console.log(this.productTitle, this.productName)
      });
    });
  }
}
