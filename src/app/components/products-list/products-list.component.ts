import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products: Product[] ;

  constructor(
    private _productService: ProductService,
    private authService : AuthenticationService,
              private router: Router) { }

  ngOnInit(): void {

    let isLoggedin = this.authService.isUserLoggedIn();

    if(!isLoggedin) {
      this.router.navigateByUrl('login');
    }

    this.reloadData();
  }

  reloadData() {
    
    this._productService.getProducts().subscribe(
      data => this.products = data
    );
    
  };

  deleteProduct(id:number){

    this._productService.deleteProduct(id).subscribe(data => {
      console.log(id + " is Deleted!!");
      this.reloadData();
    }, error => console.log(error));
  };

  getProduct(id:number) {
    this.router.navigate(['products/detail', id]);
  }

}
