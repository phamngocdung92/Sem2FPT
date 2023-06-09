import {
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../model/products';
import { ProductService } from './detail.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  activeImage: string | null = null;
  listDetail: Product[] = [];

  product: Product | null = null;
  images: any = {};
  productName : string | null = null;
  productDescription: string | null = null;
  productPrice: number | null = null;
  constructor(
    private renderer: Renderer2,
    private productService: ProductService,
    private route: ActivatedRoute
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
  }

   //change images
  onImageInputChange(productImage: string) {
    this.activeImage = productImage;
  }

  //function1


  //function2
}
