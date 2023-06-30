import {
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../model/products';
import { ProductServices } from './detail.service';
import { HttpClient } from '@angular/common/http';
import { Cart } from '../model/cart';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  cartItemCount: number = 0;
  activeImage: string | null = null;
  listDetail: Product[] = [];

  product: Product | null = null;
  images: any = {};
  productName : string | null = null;
  productDescription: string | null = null;
  productPrice: number | null = null;
  product_id: number| null =null;
  CARTS: Cart[] = [];
  
  constructor(
    private renderer: Renderer2,
    private productService: ProductServices,
    private route: ActivatedRoute,
    private http :HttpClient,
    

  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const productId = params['id'];
      this.productService.getDetail(productId).subscribe(
        (response: any) => {
          this.product = response.result;
          this.images = JSON.parse(response.result.image_product);
          this.activeImage = this.images[0];
          console.log("aloololol",this.images);
          this.productName = response.result.name_product;
          this.productDescription = response.result.description_product;
          this.productPrice = response.result.price;
        },
        (error: any) => {
          console.error(error);
        }
      );
    });
    

    //click on small image to change big image//
    const imageInputs = document.querySelectorAll('.image-choose input');
    const leftColumnImages = document.querySelectorAll('.left-column img');

    imageInputs.forEach((input) => {
      this.renderer.listen(input, 'click', () => {
        const productImage = input.getAttribute('data-image');
        leftColumnImages.forEach((img) => {
          this.renderer.setStyle(img, 'display', 'none'); // Hide all images
        });

        const selectedImage = document.querySelector(
          `.left-column img[data-image="${productImage}"]`
        );
        this.renderer.setStyle(selectedImage, 'display', 'block'); // Show the selected image
      });
    });
    //.................................//
    this.route.params.subscribe(params => {
      this.product_id = +params['id'];
    });
  }
  addToCart() {
    const iduser = localStorage.getItem('id_user');
    const id = this.product_id;
    const data = {
      userId: iduser,
      productId: id
    };
  
    this.http.post<any>('http://localhost:3006/add-to-cart', data).subscribe(
      // Xử lý kết quả sau khi thêm vào giỏ hàng (nếu cần)
    );
    window.location.reload();
    console.log('Thành công');
    
    

  }
  
   //change images
  onImageInputChange(productImage: string) {
    this.activeImage = productImage;
  }

  //function1


  //function2
}
