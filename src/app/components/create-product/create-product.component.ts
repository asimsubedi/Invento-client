import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { SupplierService } from 'src/app/services/supplier.service';
import { Observable } from 'rxjs';
import { Supplier } from 'src/app/common/supplier';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  product: Product = new Product();
  suppliers: Observable<Supplier[]>;
  submitted = false;

  constructor(private productService: ProductService,
              private _supplierService: SupplierService,
              private authService : AuthenticationService,
              private router: Router) { }

  ngOnInit(): void {
    let isLoggedin = this.authService.isUserLoggedIn();

    if(!isLoggedin) {
      this.router.navigateByUrl('login');
    }
    this.suppliers = this._supplierService.getSuppliers();
  }

  newProduct(): void{
    this.submitted = false;
    this.product = new Product();
  }

  save() {

    console.log(typeof(+this.product.supplier));
    this.productService.createProduct(this.product, +this.product.supplier).
      subscribe(
        data => console.log(data),
        error => console.log(error));
    this.product = new Product();
    this.gotoList();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  gotoList() {
    this.router.navigate(['/products'])
  }

}
