import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { SupplierListComponent } from './components/supplier-list/supplier-list.component';
import { SupplierDetailsComponent } from './components/supplier-details/supplier-details.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


const routes: Routes =[
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'home', component:HomeComponent},
  {path: 'login', component:LoginComponent},
  {path: 'products', component:ProductsListComponent},
  {path: 'products/add', component:CreateProductComponent},
  {path: 'products/detail/:id', component:ProductDetailsComponent},
  {path: 'suppliers', component:SupplierListComponent},
  {path: 'suppliers/details/:id', component: SupplierDetailsComponent},
  {path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
