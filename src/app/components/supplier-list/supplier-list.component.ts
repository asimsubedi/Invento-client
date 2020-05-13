import { Component, OnInit } from '@angular/core';
import { Supplier } from 'src/app/common/supplier';
import { SupplierService } from 'src/app/services/supplier.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {

  suppliers: Observable<Supplier[]> ;

  constructor(
      private _supplierService: SupplierService,
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
    this.suppliers = this._supplierService.getSuppliers();
  }

  supplierDetails(id: number) {
    this.router.navigate(['suppliers/details', id]);
  }

}
