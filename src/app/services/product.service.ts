import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  private BASE_URL = "http://localhost:9889/api/v1/products";
  private SAVE_URL = "http://localhost:9889/api/v1/suppliers";

  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.BASE_URL);
  }

  getProduct(id: number): Observable<any>{
    return this.httpClient.get(`${this.BASE_URL}/${id}`);
  }

  createProduct(product: Object, id:number): Observable<Object> {
    return this.httpClient.post(`${this.SAVE_URL}/${id}/products`, product);
  }

  deleteProduct(id: number):Observable<any> {
    return this.httpClient.delete(`${this.BASE_URL}/${id}`);
  }
}

