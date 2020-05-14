import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  id:number;
  product: Product;

  constructor(
    private route : ActivatedRoute,
    private router: Router,
    private productService: ProductService) { }

  ngOnInit(): void {

    this.product = new Product();
    // The route.snapshot is static image of the route information short after this component is created. 
    // the paramMap is dictionary of route parameter values extracted i.e. :id
    this.id = this.route.snapshot.params['id'];

    this.productService.getProduct(this.id).subscribe(
      data => {
        console.log(data);
        this.product = data;
      }, error => console.log(error)
    );

  }

}
