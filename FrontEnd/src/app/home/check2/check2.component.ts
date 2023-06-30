import { HttpClient } from '@angular/common/http';
import { Component, HostListener, ElementRef, Renderer2, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from 'src/app/sevice/products.sevice';
@Component({
  selector: 'app-check2',
  templateUrl: './check2.component.html',
  styleUrls: ['./check2.component.css']
})
export class Check2Component {
  cartService: any;
  images: any = {};
  product: any = {};
  
  isSticky: boolean = false;
  loseResult: string | undefined;
  productName: string | null = null;
  productDescription: string | null = null;
  productPrice: number | null = null;
  product_id: number | null = null;

  constructor(private productService: ProductService,private http:HttpClient, private dataService: ProductService, private route: ActivatedRoute, private modalService: NgbModal, private offcanvasService: NgbOffcanvas, private elementRef: ElementRef, private renderer: Renderer2) { }
  openScrollableContent(longContent: any) {
    this.modalService.open(longContent, { scrollable: true });
  }
  public isCollapsed = false;
  openEnd(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: 'end' });
  }
  ngOnInit(): void {
    this.getdetail()
    this.route.params.subscribe(params => {
      const productId = params['id'];
      this.productService.getDetailProduct(productId).subscribe(
        (response: any) => {
          this.product = response.result;
          this.images = JSON.parse(response.result.image_product);
         
          console.log("aloololol", this.images);
          this.productName = response.result.name_product;
          this.productDescription = response.result.description_product;
          this.productPrice = response.result.price;
        },
        (error: any) => {
          console.error(error);
        }
      );
    });
    this.route.params.subscribe(params => {
      this.product_id = +params['id'];
    });
  }
  getdetail() {
   
      
    this.route.params.subscribe(params => {
      const productId = params['id'];
      this.dataService.getDetailProduct(productId).subscribe(
        (response: any) => {
         
          this.product = response.result;
          console.log(this.product)
          
          
          
        },
        (error: any) => {
          console.error(error);
        }
      );
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
    console.log(data);
    
    this.cartService.increaseCartCount();

  }
  
   //change images
 
}
