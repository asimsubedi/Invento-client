import { Component, OnInit } from '@angular/core';
import { Supplier } from 'src/app/common/supplier';
import { Router, ActivatedRoute } from '@angular/router';
import { SupplierService } from 'src/app/services/supplier.service';
import { Product } from 'src/app/common/product';

@Component({
  selector: 'app-supplier-details',
  templateUrl: './supplier-details.component.html',
  styleUrls: ['./supplier-details.component.css']
})
export class SupplierDetailsComponent implements OnInit {
  id:number;
  supplier: Supplier;
  products: Product[] ;

  constructor(
    private route : ActivatedRoute,
    private supplierService: SupplierService,
  ) { }

  ngOnInit(): void {

    this.supplier = new Supplier();
  
    this.id = this.route.snapshot.params['id'];

    this.supplierService.getSupplier(this.id).subscribe(
      data => {
        this.supplier = data;
      }, error => console.log(error)
    );

    this.loadProductData();

  }

  loadProductData(){
    this.supplierService.getProductsOfSupplier(this.id).subscribe(
      data => this.products = data
    );
  }

}
