import { Component, OnInit } from '@angular/core';
import { Supplier } from 'src/app/common/supplier';
import { SupplierService } from 'src/app/services/supplier.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {

  suppliers: Observable<Supplier[]> ;

  constructor(
    private supplierService: SupplierService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadSuppliersData();
  }

  loadSuppliersData() {
    this.supplierService.getSuppliers().subscribe(
      suppliersdata => this.suppliers = suppliersdata
    );
  }

  supplierDetails(id: number) {
    this.router.navigate(['suppliers/details', id]);
  }

}
