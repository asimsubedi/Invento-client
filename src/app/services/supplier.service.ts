import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Supplier } from '../common/supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private BASE_URL = "http://localhost:9889/api/v1/suppliers";

  constructor(private httpClient: HttpClient) { }

  getSuppliers(): Observable<any> {
    return this.httpClient.get(this.BASE_URL);
  }

  getSupplier(id: number): Observable<any>{
    return this.httpClient.get(`${this.BASE_URL}/${id}`);
  }

  getProductsOfSupplier(id:number): Observable<any>{
    return this.httpClient.get(`${this.BASE_URL}/${id}/products`);
  }


}
