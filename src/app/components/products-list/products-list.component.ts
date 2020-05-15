import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})

export class ProductsListComponent implements OnInit {

  products: Product[] ;
  message: string;

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadProductData();
  }

  loadProductData() {
    this.productService.getProducts().subscribe(
      data => {
        this.products = data
      }
    );
    
  };

  deleteProduct(id:number){
    this.productService.deleteProduct(id).subscribe(data => {
      this.message = "Product with id " + id + " Deleted!!";
      this.loadProductData();
    }, error => console.log(error));
  };

  getProduct(id:number) {
    this.router.navigate(['products/detail', id]);
  }

}
