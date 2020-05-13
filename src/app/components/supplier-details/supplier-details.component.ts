import { Component, OnInit } from '@angular/core';
import { Supplier } from 'src/app/common/supplier';
import { Router, ActivatedRoute } from '@angular/router';
import { SupplierService } from 'src/app/services/supplier.service';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-supplier-details',
  templateUrl: './supplier-details.component.html',
  styleUrls: ['./supplier-details.component.css']
})
export class SupplierDetailsComponent implements OnInit {
  id:number;
  supplier: Supplier;
  products: Product[] ;

  constructor( private route : ActivatedRoute,
              private router: Router,
              private supplierService: SupplierService,
              private authService: AuthenticationService,
              private _productService: ProductService) { }

  ngOnInit(): void {

    let isLoggedin = this.authService.isUserLoggedIn();

    if(!isLoggedin) {
      this.router.navigateByUrl('login');
    }

    this.supplier = new Supplier();
  
    this.id = this.route.snapshot.params['id'];

    this.supplierService.getSupplier(this.id).subscribe(
      data => {
        console.log(data);
        this.supplier = data;
      }, error => console.log(error)
    );

    this.reloadProductData();

  }

  reloadProductData(){
    this.supplierService.getProductsOfSupplier(this.id).subscribe(
      data => this.products = data
    );
  }

}
